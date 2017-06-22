import Web3 from 'web3';
import ConsoleUtil from './ConsoleUtil';
import BetOnDateInterface from './BetOnDate.json';
import * as DateUtil from '../utils/DateUtil';

/* **************************************************************** */
/* **************************************************************** */
let contractAddress = '0x85c2814f2fce9d90d96c9a8ac7d0494e60c7553c';
/* **************************************************************** */
/* **************************************************************** */

class ContractDelegate {

  constructor(stateUpdateCallback, debug) {

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

    this.getNodeData();
    this.getContractData();
    this.handleEventsFromTheContract();

    if(debug) {
      new ConsoleUtil(this);
    }
  }

  /*
  * Interact with contract
  * */

  placeBet(date) {

    console.log('ContractManager - placeBet()');

    let account = this.web3.eth.accounts[this.activeAccountIdx];
    console.log('account: ', account);

    let betDateUnix = DateUtil.dateToUnix(date);
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
    this.placeBetSuccess = success;
    this.placeBetStatus = msg;

    // Place bet.
    if(success) {
      this.contract.placeBet(betDateUnix, {from:account, value:betValueWei});
    }

    this.getBalance();
    this.stateUpdateCallback();
  }

  resolveGame(date) {
    let dateUnix = DateUtil.dateToUnix(date);
    this.contract.resolve(dateUnix, {from: this.web3.eth.accounts[0], gas: 2100000});
  }

  withdrawPrize() {

    console.log('ContractManager - withdrawPrize()');

    let account = this.web3.eth.accounts[this.activeAccountIdx];

    // Validate withdrawal.
    let results = this.contract.validatePrizeWithdrawal.call(
      {from: account}
    );
    let success = results[0] === 'true';
    let msg = this.web3.toAscii(results[1]);
    console.log('  success: ', success);
    console.log('  msg: ', msg);
    this.withdrawPrizeStatus = msg;

    // Withdraw prize.
    if(success) {
      this.contract.withdrawPrize({from: account, gas: 2100000});
    }

    this.getBalance();
    this.stateUpdateCallback();
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

  changeDate(date) {
    console.log('travel to date: ', date);
    let dateUnix = DateUtil.dateToUnix(date);
    this.contract.setTime(dateUnix, {from: this.web3.eth.accounts[0]});
  }

  /*
  * Get data from the contract/blockchain
  * */

  getNodeData() {
    this.activeAccountIdx = 0;
    this.accounts = this.web3.eth.accounts;
  }

  getContractData() {
    this.getBasicContractData();
    this.getBalance();
    this.getWinData();
  }

  getBasicContractData() {
    this.currentDate = DateUtil.unixToDate(this.contract.getTime().toNumber());
    this.unitBet = this.web3.fromWei(this.contract.unitBet.call().toNumber(), 'ether');
    this.lastDayToBet = DateUtil.unixToDate(this.contract.lastDayToBet.call().toNumber());
    this.gameState = this.stateAsStr(this.contract.currentGameState.call().toNumber());
    this.getBalance();
  }

  getWinData() {
    if(this.gameState !== this.stateAsStr(2)) {
      return;
    }
    this.numWinners = this.contract.numWinners.call().toNumber();
    this.winPrize = this.web3.fromWei(this.contract.getPrize().toNumber(), 'ether');
    this.winDate = DateUtil.unixToDate(this.contract.resolutionDate.call().toNumber());
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
}

export default ContractDelegate;