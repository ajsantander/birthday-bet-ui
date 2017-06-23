import React from 'react';
import { Button } from 'react-bootstrap';
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

      <p>My daughter was born on {DateUtil.dateToStr(winDate)}.</p>
      <p>Number of winners: {numWinners}</p>
      <p>Each winner gets: {winPrize} ETH</p>

      <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>

      <Button
        bsStyle="primary"
        bsSize="large"
        type="submit"
        onClick={(evt) => handleButtonClick()}>
        Withdraw Prize
      </Button>

      <p>{withdrawPrizeStatus}</p>

    </div>
  )
};

export default Winner;