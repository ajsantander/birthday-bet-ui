import React from 'react';
import './Winner.css';

const Winner = ({numWinners, winPrize, winDate, handleWithdrawPrize}) => {

  const handleButtonClick = () => {
    handleWithdrawPrize();
  };

  return (
    <div className="container-winner">

      <h2>And the winner is!</h2>

      <p>Win date: {winDate}</p>
      <p>Winners: {numWinners}</p>
      <p>Each winner gets: {winPrize} ETH</p>
      <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>

      <button onClick={(evt) => handleButtonClick()}>Withdraw Prize!</button>
    </div>
  )
};

export default Winner;