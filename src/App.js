import React, { Component } from 'react';
import Welcome from './components/Welcome';
import PlaceBets from './components/PlaceBets';
import BetsClosed from './components/BetsClosed';
import Winner from './components/Winner';
import Rules from './components/Rules';
import HowTo from './components/HowTo';
import ContractDelegate from './eth/ContractDelegate';
import './App.css';
import Stats from './components/Stats';

class App extends Component {

  constructor() {
    super();

    this.handleContractStateUpdate = this.handleContractStateUpdate.bind(this);
    this.handlePlaceBet = this.handlePlaceBet.bind(this);
    this.handleWithdrawPrize = this.handleWithdrawPrize.bind(this);

    this.state = {
      unitBet: 0,
      lastDayToBet: 0,
      gameState: -1,
      gameBalance: 0,
      placeBetStatus: ''
    };

    this.contractDelegate = new ContractDelegate(
      this.handleContractStateUpdate
    );
  }

  componentWillMount() {
    this.handleContractStateUpdate();
  }

  handleContractStateUpdate() {
    this.setState({
      unitBet: String(this.contractDelegate.unitBet),
      lastDayToBet: String(this.contractDelegate.lastDayToBet),
      gameState: this.contractDelegate.gameState,
      gameBalance: this.contractDelegate.contractBalance,
      placeBetStatus: this.contractDelegate.placeBetStatus,
      numWinners: String(this.contractDelegate.numWinners),
      winPrize: String(this.contractDelegate.winPrize),
      winDate: String(this.contractDelegate.winDate)
    });
  }

  handlePlaceBet(date, acctIndex) {
    this.contractDelegate.placeBet(date, acctIndex);
  }

  handleWithdrawPrize(acctIndex) {
    this.contractDelegate.withdrawPrize(acctIndex);
  }

  render() {

    let activeState;
    switch(this.state.gameState) {
      case 'betsAreOpen':
        activeState =
          <PlaceBets
            placeBetStatus={this.state.placeBetStatus}
            handlePlaceBet={this.handlePlaceBet}
          />;
        break;
      case 'betsAreClosed':
        activeState = <BetsClosed/>;
        break;
      case 'betsResolved':
        activeState =
          <Winner
            numWinners={this.state.numWinners}
            winPrize={this.state.winPrize}
            winDate={this.state.winDate}
            handleWithdrawPrize={this.handleWithdrawPrize}
          />;
        break;
      default:
        activeState = <p></p>;
    }

    return (
      <div className="container">

        <Welcome/>
        <Stats
          gameBalance={this.state.gameBalance}
          unitBet={this.state.unitBet}
          lastDayToBet={this.state.lastDayToBet}
        />
        {activeState}
        <Rules/>
        <HowTo/>
      </div>
    );
  }
}

export default App;
