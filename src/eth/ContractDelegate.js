import Web3 from 'web3';
import BetOnDateInterface from './BetOnDate.json';

/* **************************************************************** */
let contractAddress = '0x549d5d717c037c6ffc0ae356609e9275c036703d';
/* **************************************************************** */

class ContractDelegate {

  constructor(updateCallback) {

    console.log('ContractDelegate');
    this.updateCallback = updateCallback;

    // Init web3.
    let provider = new Web3.providers.HttpProvider('http://localhost:8545');
    this.web3 = new Web3(provider);
    console.log('accounts: ', this.web3.eth.accounts);

    // Retrieve contract.
    this.contract = this.getDeployedContract();

    // Get basic contract info.
    this.unitBet = this.contract.unitBet.call().toNumber();
    this.lastDayToBet = this.contract.lastDayToBet.call().toNumber();
    console.log('unitBet: ', this.unitBet);
    console.log('lastDayToBet: ', this.lastDayToBet);
  }

  getDeployedContract() {
    let contractFactory = this.web3.eth.contract(BetOnDateInterface.abi);
    return contractFactory.at(contractAddress);
  }
}

export default ContractDelegate;