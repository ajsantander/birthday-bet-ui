import React from 'react';
import './Stats.css'

const Stats = ({unitBet, lastDayToBet, gameBalance}) => {
  return (
    <div className="stats-container">
      Bet value: {unitBet} ETH   |
      Total prize: {gameBalance} ETH   |
      Bets close on: {String(lastDayToBet)}   |
    </div>
  )
};

export default Stats;