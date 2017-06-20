import Web3 from 'web3';
import BetOnDateInterface from './BetOnDate.json';

/* **************************************************************** */
let contractAddress = '0x36ffb8abcea08a46ad7047aa82085772534b3937';
/* **************************************************************** */

class ContractDelegate {

  constructor(updateCallback, placeBetStatusCallback) {

    console.log('ContractDelegate');
    this.updateCallback = updateCallback;
    this.placeBetStatusCallback = placeBetStatusCallback;

    // Init web3.
    let provider = new Web3.providers.HttpProvider('http://localhost:8545');
    let web3 = new Web3(provider);
    this.web3 = web3;
    console.log('accounts: ', this.web3.eth.accounts);

    // Retrieve contract.
    this.contract = this.getDeployedContract();
    // console.log('contract: ', this.contract);

    // Get basic contract info.
    this.unitBet = this.web3.fromWei(this.contract.unitBet.call().toNumber(), 'ether');
    this.lastDayToBet = this.formatDate(this.contract.lastDayToBet.call().toNumber());
    this.gameState = this.stateAsStr(this.contract.currentGameState.call().toNumber());
    this.updateBalance();

    // Listen to contract events.
    let gameStateChangedEvent = this.contract.GameStateChanged();
    gameStateChangedEvent.watch((error, result) => {
      console.log("GameStateChanged");
      this.gameState = this.stateAsStr(result.args.state.toNumber());
      console.log('this.gameState: ', this.gameState);
      this.updateCallback();
    });

    this.deployConsoleUtils();
  }

  deployConsoleUtils() {

    let web3 = this.web3;
    let contract = this.contract;
    let delegate = this;

    window.logBalances = function() {
      let accounts = web3.eth.accounts;
      for(let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        console.log('balance ' + account + ' [' + i + ']: ', window.getBalance(account));
      }
    };

    window.getBalance = function(account) {
      let balWei = web3.eth.getBalance(account).toNumber();
      let balEther = +web3.fromWei(balWei, 'ether');
      return balEther;
    };

    window.skipToDate = function(date) {
      let dateUnix = delegate.getUnixTimeStamp(date);
      contract.setTime(dateUnix, {from: web3.eth.accounts[0]});
    };

    window.resolve = function(date) {
      let dateUnix = delegate.getUnixTimeStamp(date);
      contract.resolve(dateUnix, {from: web3.eth.accounts[0], gas: 2100000});
    };

    window.web3 = web3;
  }

  stateAsStr(gameState) {
    // return 'betsAreOpen';
    // return 'betsAreClosed';
    // return 'betsResolved';
    switch(gameState) {
      case 0:
        return 'betsAreOpen';
      case 1:
        return 'betsAreClosed';
      case 2:
        return 'betsResolved';
      default:
        return 'unknown';
    }
  }

  placeBet(date, acctIndex) {

    console.log('ContractManager - placeBet()');

    let account = this.web3.eth.accounts[acctIndex];
    console.log('account: ', account);

    let betDateUnix = this.getUnixTimeStamp(date);
    let betValueWei = this.web3.toWei(this.unitBet, 'ether');

    // Validate bet.
    let results = this.contract.validateBet.call(
      betDateUnix,
      betValueWei,
      {from: account}
    );
    let success = results[0];
    let msg = this.web3.toAscii(results[1]);
    console.log('  success: ', success);
    console.log('  msg: ', msg);

    // Place bet.
    if(success) {
      this.contract.placeBet(betDateUnix, {from:account, value:betValueWei});
    }

    this.updateBalance();

    // Feedback.
    this.placeBetStatusCallback(msg);
    this.updateCallback();
  }

  updateBalance() {
    let balWei = this.web3.eth.getBalance(contractAddress).toNumber();
    let balEther = +this.web3.fromWei(balWei, 'ether');
    this.contractBalance = balEther;
  }

  formatDate(dateUnix) {
    let date = new Date(dateUnix * 1000);
    return date;
  }

  getUnixTimeStamp(date) {
    return Math.floor(date.getTime() / 1000);
  }

  getDeployedContract() {
    let contractFactory = this.web3.eth.contract(BetOnDateInterface.abi);
    return contractFactory.at(contractAddress);
  }
}

export default ContractDelegate;