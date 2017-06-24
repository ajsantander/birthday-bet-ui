import React, { Component } from 'react';

import GameStateHub from './components/GameStateHub';
import Rules from './components/info/Rules';
import HowTo from './components/info/HowTo';
import Footer from './components/info/Footer';
import Debug from './components/Debug';
import * as DateUtil from './utils/DateUtil';

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
    // *********************
    // *********************
    this.DEBUG_MODE = false;
    // if true, it will:
    // 1) use a local web3 instance connected to a testrpc blockhain
    //    instead of an injected web3 (like metamask).
    // 2) display a debugging console that can be used to fully simulate games with a testrpc running.
    // *********************
    // *********************
    // *********************

    // Init contract delegate.
    this.contractDelegate = new ContractDelegate(
      this.handleContractStateUpdate,
      this.DEBUG_MODE
    );

    this.state = {};
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
      withdrawPrizeSuccess: this.contractDelegate.withdrawPrizeSuccess,
      withdrawPrizeStatus: this.contractDelegate.withdrawPrizeStatus,
      playerBalance: this.contractDelegate.playerBalance,
      isWinner: this.contractDelegate.isWinner,
      betDate: this.contractDelegate.betDate
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
    this.contractDelegate.changeActiveAccount(accountIdx);
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

  render() {

    const betsAreOpen = this.state.gameState && this.state.gameState === 'betsAreOpen';
    const daysLeft = betsAreOpen ? DateUtil.deltaDays(new Date(), this.state.lastDayToBet) : 0;
    const daysLeftStr = daysLeft === 1 ? `${daysLeft} day` : `${daysLeft} days`;

    return (
      <div className="container">

        <br/>

        {/* HEADER */}
        <div className="jumbotron">

          <h1 className="page-title">BirthdayBet</h1>
          <p>
            My daughter is scheduled for natural birth on July 15th... Plus or minus 2 weeks.
            What day will it be?
          </p>

          {/* STATS */}
          <h2>
            <span className="label label-info">
              Jackpot &nbsp;
              <span className="badge">{this.state.gameBalance} ETH</span>
            </span>
            &nbsp;
            {betsAreOpen &&
            <span className={`label label-${daysLeft < 3 ? 'danger' : 'warning'}`}>
              Bets close in {daysLeftStr}
            </span>
            }
            {!betsAreOpen &&
            <span className={`label label-danger`}>
              Bets are closed
            </span>
            }
          </h2>
        </div>

        {/* GAME AREA => PlaceBets || BetsClosed || Winner */}
        <div className="row">
          <div className="col-md-8">
            <GameStateHub
              gameState={this.state.gameState}
              withdrawPrizeSuccess={this.state.withdrawPrizeSuccess}
              betDate={this.state.betDate}
              lastDayToBet={this.state.lastDayToBet}
              gameBalance={this.state.gameBalance}
              placeBetSuccess={this.state.placeBetSuccess}
              placeBetStatus={this.state.placeBetStatus}
              unitBet={this.state.unitBet}
              handlePlaceBet={this.handlePlaceBet}
              numWinners={this.state.numWinners}
              winPrize={this.state.winPrize}
              winDate={this.state.winDate}
              withdrawPrizeStatus={this.state.withdrawPrizeStatus}
              handleWithdrawPrize={this.handleWithdrawPrize}
              isWinner={this.state.isWinner}
            />
          </div>

          {/* SIDE PANEL */}
          <div className="col-md-4">
            <Rules/>
            <HowTo/>
          </div>
        </div>

        <br/>

        <Footer/>

        {/* DEBUG AREA */}
        {this.DEBUG_MODE &&
        <Debug
          currentContractDate={this.state.currentContractDate}
          lastDayToBet={this.state.lastDayToBet}
          accounts={this.state.accounts}
          activeAccountIdx={this.state.activeAccountIdx}
          handleAccountSelect={this.handleAccountSelect}
          handleContractDateChange={this.handleContractDateChange}
          handleResolveDateSet={this.handleResolveDateSet}
          playerBalance={this.state.playerBalance}
        />}

      </div>
    );
  }
}

export default App;
