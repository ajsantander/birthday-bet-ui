import React from 'react';
import './css/Stats.css'
import * as DateUtil from '../utils/DateUtil';

const Stats = ({unitBet, lastDayToBet, gameBalance}) => {
  return (
    <div className="container">
      Bet value: {unitBet} ETH   |
      Contract Balance: {gameBalance} ETH   |
      Bets close on: {DateUtil.dateToStr(lastDayToBet)}
    </div>
  )
};

export default Stats;