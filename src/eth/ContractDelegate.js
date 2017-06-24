import Web3 from 'web3';
import Truffle from 'truffle-contract';
import * as DateUtil from '../utils/DateUtil';
import BetOnDateArtifacts from './BetOnDate.json';

class ContractDelegate {

  constructor(stateUpdateCallback, debug) {

    // This callback will be executed each time there is an
    // update from the contract.
    this.stateUpdateCallback = stateUpdateCallback;
    this.deug = debug;

    // Default state.
    this.currentDate = new Date();
    this.lastDayToBet = new Date();
    this.betDate = undefined;
    this.gameState = undefined;
    this.activeAccount = undefined;

    window.addEventListener('load', () => {
      this.initialize();
    });
  }

  initialize() {

    // Init web3.
    if(!this.debug && window.web3 && typeof window.web3 !== undefined) {
      console.log('ContractDelegate - using web3 form external source.');
      this.web3 = window.web3;
    }
    else {
      console.log('ContractDelegate - using testrpc web3.');
      let provider = new Web3.providers.HttpProvider('http://localhost:8545');
      let web3 = new Web3(provider);
      this.web3 = web3;
    }
    console.log('accounts: ', this.web3.eth.accounts);

    // Retrieve contract.
    this.contract = Truffle(BetOnDateArtifacts);
    this.contract.setProvider(this.web3.currentProvider);

    // Refresh state.
    this.getNodeData();
    this.getContractData();
    this.getPlayerData();
    this.handleEventsFromTheContract();

    // Listen for account changes.
    setInterval(() => {
      if(this.web3.eth.accounts && this.web3.eth.accounts.length > 0) {
        if(this.web3.eth.accounts[0] !== this.activeAccount) {
          console.log('account changed: ' + this.web3.eth.accounts[0]);
          this.activeAccount = this.web3.eth.accounts[0];
          this.changeActiveAccount(0);
        }
      }
    }, 100);
  }

  /*
   * Get data from the contract/blockchain
   * */

  getContract() {
    // return this.contract.deployed();
    return this.contract.at('0xe089a5e7d3b804666a12c778fd22e4d80d4ad494');
    // return this.contract.at('0xe5f3f89a7e90bf5ea69fcdcebc0835f483637f4b');
  }

  getPlayerData() {

    console.log('ContractDelegate - getPlayerData()');

    const account = this.getAccountAtIndex(this.activeAccountIdx);
    console.log('account: ', account);

    // Account balance.
    this.web3.eth.getBalance(account, (error, result) => {
      if(!error) {
        console.log('result: ', result);
        this.playerBalance = +this.web3.fromWei(result.toNumber(), 'ether');
        this.stateUpdateCallback();
      }
      else { console.log(error) }
    });

    // Bet date.
    this.getContract().then(instance => {
      this.contract.instance = instance;
      return this.contract.instance.getPlayerBetDate(account);
    }).then((unixDate) => {
      let date = unixDate.toNumber();
      if(date !== 0) {
        this.betDate = DateUtil.unixToDate(date);
        console.log('player bet: ', this.betDate);
      }
      else { this.betDate = undefined; }
      return this.contract.instance.validatePrizeWithdrawal.call({from: account});
    }).then(results => {
      let success = results[0];
      this.isWinner = success;
      this.stateUpdateCallback();
    });
  }

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
    console.log('ContractManager - getBasicContractDate()');
    this.getContract().then(instance => {
      this.contractAddress = instance.address;
      console.log('this.contractAddress: ', this.contractAddress);
      this.contract.instance = instance;
      this.stateUpdateCallback();
      return this.contract.instance.getTime();
    }).then(time => {
      this.currentDate = DateUtil.unixToDate(time.toNumber());
      console.log('this.currentDate: ', this.currentDate);
      this.stateUpdateCallback();
      return this.contract.instance.unitBet.call();
    }).then(unitBet => {
      this.unitBet = this.web3.fromWei(unitBet.toNumber(), 'ether');
      console.log('this.unitBet: ', this.unitBet);
      this.stateUpdateCallback();
      return this.contract.instance.lastDayToBet.call();
    }).then(lastDayToBet => {
      this.lastDayToBet = DateUtil.unixToDate(lastDayToBet.toNumber());
      console.log('this.lastDayToBet: ', this.lastDayToBet);
      this.stateUpdateCallback();
      return this.contract.instance.currentGameState.call();
    }).then(currentGameState => {
      this.gameState = this.stateAsStr(currentGameState.toNumber());
      console.log('this.gameState: ', this.gameState);
      this.stateUpdateCallback();
    });
  }

  getWinData() {
    console.log('ContractManager - getWinData()');

    // Avoid getting win data if game is not resolved.
    if(this.gameState !== this.stateAsStr(2)) { return; }

    this.getContract().then(instance => {
      this.contract.instance = instance;
      return this.contract.instance.numWinners.call();
    }).then(numWinners => {
      this.numWinners = numWinners.toNumber();
      this.stateUpdateCallback();
      console.log('this.numWinners: ', this.numWinners);
      return this.contract.instance.getPrize()
    }).then(prize => {
      this.winPrize = this.web3.fromWei(prize.toNumber(), 'ether');
      this.stateUpdateCallback();
      return this.contract.instance.resolutionDate.call();
    }).then(resolutionDate => {
      this.winDate = DateUtil.unixToDate(resolutionDate.toNumber());
      this.stateUpdateCallback();
    });
  }

  getBalance() {
    console.log('ContractManager - getBalance()');
    this.getContract().then(instance => {
      this.contractAddress = instance.address;
      this.web3.eth.getBalance(this.contractAddress, (error, balWei) => {
        console.log('balWei: ', balWei);
        this.contractBalance = +this.web3.fromWei(balWei, 'ether');
        console.log('contractBalance: ', this.contractBalance);
        this.stateUpdateCallback();
      });
    });
  }

  /*
  * Interact with contract
  * */

  placeBet(date) {

    console.log('ContractManager - placeBet()');

    let account = this.getAccountAtIndex(this.activeAccountIdx);
    console.log('account: ', account);

    let betDateUnix = DateUtil.dateToUnix(date);
    let betValueWei = this.web3.toWei(this.unitBet, 'ether');

    // Validate bet.
    this.getContract().then(instance => {
      this.contract.instance = instance;
      return this.contract.instance.validateBet.call(
        betDateUnix,
        betValueWei,
        {from: account}
      );
    }).then(results => {
      let success = results[0];
      let msg = this.web3.toAscii(results[1]);
      console.log('  success: ', success);
      console.log('  msg: ', msg);
      this.placeBetSuccess = success;
      this.placeBetStatus = msg;

      // Place bet.
      if(success) {
        this.betDate = date;
        this.stateUpdateCallback();
        return this.contract.instance.placeBet(betDateUnix, {from:account, value:betValueWei});
      }
    }).then(() => {
      this.getBalance();
      this.stateUpdateCallback();
    });
  }

  resolveGame(date) {
    console.log('ContractManager - resolveGame()');
    let dateUnix = DateUtil.dateToUnix(date);
    this.getContract().then(instance => {
      this.contract.instance = instance;
      // TODO: define gas
      return this.contract.instance.resolve(dateUnix, {from: this.web3.eth.accounts[0], gas: 2100000});
    }).then(() => {
      this.stateUpdateCallback();
      console.log('contract resolved');
    });
  }

  withdrawPrize() {

    console.log('ContractManager - withdrawPrize()');

    let account = this.getAccountAtIndex(this.activeAccountIdx);

    // Validate withdrawal.
    this.getContract().then(instance => {
      this.contract.instance = instance;
      return this.contract.instance.validatePrizeWithdrawal.call({from: account});
    }).then((results) => {
      let success = results[0];
      let msg = this.web3.toAscii(results[1]);
      console.log('  success: ', success);
      console.log('  msg: ', msg);
      this.withdrawPrizeSuccess = success;
      this.withdrawPrizeStatus = msg;

      // Withdraw prize.
      if(success) {
        // TODO: define gas
        this.stateUpdateCallback();
        return this.contract.instance.withdrawPrize({from: account, gas: 2100000});
      }
    }).then(() => {
      console.log('prize withdrawn');
      this.getBalance();
      this.getPlayerData();
      this.stateUpdateCallback();
    });
  }

  changeDate(date) {
    console.log('ContractDelegate - travel to date: ', date);
    let dateUnix = DateUtil.dateToUnix(date);
    this.getContract().then(instance => {
      this.contract.instance = instance;
      return this.contract.instance.setTime(dateUnix, {from: this.web3.eth.accounts[0]});
    }).then(() => {
      this.stateUpdateCallback();
      console.log('time set');
    });
  }

  changeActiveAccount(idx) {
    this.activeAccountIdx = idx;
    this.getPlayerData();
    this.stateUpdateCallback();
  }

  handleEventsFromTheContract() {
    this.getContract().then(instance => {
      this.contract.instance = instance;
      let gameStateChangedEvent = this.contract.instance.GameStateChanged();
      gameStateChangedEvent.watch((error, result) => {
        console.log("GameStateChanged");
        this.gameState = this.stateAsStr(result.args.state.toNumber());
        console.log('this.gameState: ', this.gameState);
        this.getWinData();
        this.stateUpdateCallback();
      });
    });
  }

  /*
  * Utils
  * */

  stateAsStr(gameState) {
    switch(gameState) {
      case 0: return 'betsAreOpen';
      case 1: return 'betsAreClosed';
      case 2: return 'betsResolved';
      default: return undefined;
    }
  }

  getAccountAtIndex(index) {
    if(this.debug) {
      return this.web3.eth.accounts[index];
    }
    else {
      return this.web3.eth.accounts[0] || this.web3.eth.coinbase;
    }
  }
}

export default ContractDelegate;