import React, { Component } from 'react';
import Welcome from './components/Welcome';
import StateHub from './components/StateHub';
import Rules from './components/Rules';
import HowTo from './components/HowTo';
import ContractDelegate from './eth/ContractDelegate';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.handleContractUpdate = this.handleContractUpdate.bind(this);

    this.state = {
      unitBet: 0,
      lastDayToBet: 0
    }

    this.contractDelegate = new ContractDelegate(this.handleContractUpdate);
  }

  componentWillMount() {
    this.handleContractUpdate();
  }

  handleContractUpdate() {
    this.setState({
      unitBet: String(this.contractDelegate.unitBet),
      lastDayToBet: String(this.contractDelegate.lastDayToBet)
    });
  }

  render() {
    return (
      <div>

        <pre>unitBet: {this.state.unitBet}</pre>
        <pre>lastDayToBet: {this.state.lastDayToBet}</pre>

        <Welcome/>
        <StateHub/>
        <Rules/>
        <HowTo/>
      </div>
    );
  }
}

export default App;
