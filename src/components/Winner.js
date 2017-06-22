import React from 'react';
import './css/Winner.css';
import * as DateUtil from '../utils/DateUtil';

const Winner = ({ numWinners,
                  winPrize,
                  winDate,
                  withdrawPrizeStatus,
                  handleWithdrawPrize}) => {

  const handleButtonClick = () => {
    handleWithdrawPrize();
  };

  return (
    <div className="container">

      <h2>And the winner is!</h2>

      <p>Win date: {DateUtil.dateToStr(winDate)}</p>
      <p className="text-right">Winners: {numWinners}</p>
      <p>Each winner gets: {winPrize} ETH</p>

      <hr/>

      <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>
      <button
        className="btn btn-primary"
        onClick={(evt) => handleButtonClick()}>Withdraw Prize!</button>

      <p>{withdrawPrizeStatus}</p>

    </div>
  )
};

export default Winner;