import Web3 from 'web3';
import ConsoleUtil from './ConsoleUtil';
import BetOnDateInterface from './BetOnDate.json';

/* **************************************************************** */
let contractAddress = '0x3607766a696519283c9ce489199d417326e1efb8';
/* **************************************************************** */

class ContractDelegate {

  constructor(stateUpdateCallback) {

    console.log('ContractDelegate');
    this.stateUpdateCallback = stateUpdateCallback;

    // Init web3.
    let provider = new Web3.providers.HttpProvider('http://localhost:8545');
    let web3 = new Web3(provider);
    this.web3 = web3;
    console.log('accounts: ', this.web3.eth.accounts);

    // Retrieve contract.
    this.contract = this.getDeployedContract();
    // console.log('contract: ', this.contract);

    this.getContractData();
    this.handleEventsFromTheContract();

    new ConsoleUtil(this);
  }

  /*
  * Interact with contract
  * */

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
    this.placeBetStatus = msg;

    // Place bet.
    if(success) {
      this.contract.placeBet(betDateUnix, {from:account, value:betValueWei});
    }

    this.getBalance();

    // Feedback.
    this.stateUpdateCallback();
  }

  withdrawPrize(acctIndex) {
    this.contract.withdrawPrize({from: this.web3.eth.accounts[acctIndex], gas: 2100000});
  }

  getContractData() {
    this.getBasicContractData();
    this.getBalance();
    this.getWinData();
  }

  getBasicContractData() {
    this.unitBet = this.web3.fromWei(this.contract.unitBet.call().toNumber(), 'ether');
    this.lastDayToBet = this.formatDate(this.contract.lastDayToBet.call().toNumber());
    this.gameState = this.stateAsStr(this.contract.currentGameState.call().toNumber());
    this.getBalance();
  }

  getWinData() {
    this.numWinners = this.contract.numWinners.call().toNumber();
    this.winPrize = this.web3.fromWei(this.contract.getPrize().toNumber(), 'ether');
    this.winDate = this.formatDate(this.contract.resolutionDate.call().toNumber());
  }

  getBalance() {
    let balWei = this.web3.eth.getBalance(contractAddress).toNumber();
    let balEther = +this.web3.fromWei(balWei, 'ether');
    this.contractBalance = balEther;
  }

  getDeployedContract() {
    let contractFactory = this.web3.eth.contract(BetOnDateInterface.abi);
    return contractFactory.at(contractAddress);
  }

  handleEventsFromTheContract() {
    let gameStateChangedEvent = this.contract.GameStateChanged();
    gameStateChangedEvent.watch((error, result) => {
      console.log("GameStateChanged");
      this.gameState = this.stateAsStr(result.args.state.toNumber());
      console.log('this.gameState: ', this.gameState);
      this.getWinData();
      this.stateUpdateCallback();
    });
  }

  /*
  * Utils
  * */

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

  formatDate(dateUnix) {
    let date = new Date(dateUnix * 1000);
    return date;
  }

  getUnixTimeStamp(date) {
    return Math.floor(date.getTime() / 1000);
  }
}

export default ContractDelegate;