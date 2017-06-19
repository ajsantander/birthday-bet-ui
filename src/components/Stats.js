import React from 'react';

class Stats extends React.Component {
  render() {
    var {unitBet, lastDayToBet, gameBalance} = this.props;
    return (
      <div>
        <h2>Stats</h2>
        <p>Bet value: {unitBet} ETH</p>
        <p>Total prize: {gameBalance} ETH</p>
        <p>Bets close on: {lastDayToBet}</p>
      </div>
    )
  }
}

export default Stats;