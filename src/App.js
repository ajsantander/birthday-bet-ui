import React, { Component } from 'react';

import Welcome from './components/Welcome';
import PlaceBets from './components/PlaceBets';
import BetsClosed from './components/BetsClosed';
import Winner from './components/Winner';
import Rules from './components/Rules';
import HowTo from './components/HowTo';
import Debug from './components/Debug';
import Stats from './components/Stats';
import './css/App.css';

import ContractDelegate from './eth/ContractDelegate';

class App extends Component {

  constructor() {
    super();

    this.handleContractStateUpdate = this.handleContractStateUpdate.bind(this);
    this.handlePlaceBet = this.handlePlaceBet.bind(this);
    this.handleWithdrawPrize = this.handleWithdrawPrize.bind(this);
    this.handleAccountSelect = this.handleAccountSelect.bind(this);
    this.handleContractDateChange = this.handleContractDateChange.bind(this);
    this.handleResolveDateSet = this.handleResolveDateSet.bind(this);

    // *********************
    this.DEBUG_MODE = true;
    // *********************

    this.state = {
      unitBet: 0,
      lastDayToBet: 0,
      gameState: -1,
      gameBalance: 0,
      placeBetSuccess: false,
      placeBetStatus: '',
      accounts: [],
      activeAccountIdx: 0,
      withdrawPrizeStatus: ''
    };

    // Init contract delegate.
    this.contractDelegate = new ContractDelegate(
      this.handleContractStateUpdate,
      this.DEBUG_MODE
    );
  }

  /*
  * From the contract
  * */

  // Updates from the contract delegate.
  handleContractStateUpdate() {
    this.setState({
      unitBet: String(this.contractDelegate.unitBet),
      lastDayToBet: this.contractDelegate.lastDayToBet,
      gameState: this.contractDelegate.gameState,
      gameBalance: this.contractDelegate.contractBalance,
      placeBetSuccess: this.contractDelegate.placeBetSuccess,
      placeBetStatus: this.contractDelegate.placeBetStatus,
      numWinners: String(this.contractDelegate.numWinners),
      winPrize: String(this.contractDelegate.winPrize),
      winDate: this.contractDelegate.winDate,
      accounts: this.contractDelegate.accounts,
      activeAccountIdx: this.contractDelegate.activeAccountIdx,
      currentContractDate: this.contractDelegate.currentDate,
      withdrawPrizeStatus: this.contractDelegate.withdrawPrizeStatus
    });
  }

  /*
  * From components
  * */

  handleResolveDateSet(date) {
    this.contractDelegate.resolveGame(date);
  }

  handleContractDateChange(date) {
    this.contractDelegate.changeDate(date);
  }

  handleAccountSelect(accountIdx) {
    this.contractDelegate.activeAccountIdx = accountIdx;
    this.setState({activeAccountIdx: this.contractDelegate.activeAccountIdx});
  }

  handlePlaceBet(date) {
    this.contractDelegate.placeBet(date);
  }

  handleWithdrawPrize() {
    this.contractDelegate.withdrawPrize();
  }

  /*
  * React Lifecycle
  * */

  componentWillMount() {
    this.handleContractStateUpdate();
  }

  render() {
    return (
      <div className="container">

        {this.DEBUG_MODE &&
        <Debug
          currentContractDate={this.state.currentContractDate}
          lastDayToBet={this.state.lastDayToBet}
          accounts={this.state.accounts}
          activeAccountIdx={this.state.activeAccountIdx}
          handleAccountSelect={this.handleAccountSelect}
          handleContractDateChange={this.handleContractDateChange}
          handleResolveDateSet={this.handleResolveDateSet}
        />}


        <Welcome/>

        <Stats
          gameBalance={this.state.gameBalance}
          unitBet={this.state.unitBet}
          lastDayToBet={this.state.lastDayToBet}
        />

        {/* PlaceBets || BetsClosed || Winner */}
        {(() => {
          switch(this.state.gameState) {
            case 'betsAreOpen':
              return <PlaceBets
                minDate={this.state.lastDayToBet}
                placeBetSuccess={this.state.placeBetSuccess}
                placeBetStatus={this.state.placeBetStatus}
                handlePlaceBet={this.handlePlaceBet}
              />;
            case 'betsAreClosed':
              return <BetsClosed/>;
            case 'betsResolved':
              return <Winner
                numWinners={this.state.numWinners}
                winPrize={this.state.winPrize}
                winDate={this.state.winDate}
                withdrawPrizeStatus={this.state.withdrawPrizeStatus}
                handleWithdrawPrize={this.handleWithdrawPrize}
              />;
            default:
              return <br/>;
          }
        })()}

        <Rules/>

        <HowTo/>

      </div>
    );
  }
}

export default App;
