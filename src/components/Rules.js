import React from 'react';

const Rules = () => {
  return (
    <div>
      <h2>Rules</h2>
      <p>All the rules and funtionality below are set and enforced by an ethereum smart contract.</p>
      <ul>
        <li>Fixed bet of 0.5 eth</li>
        <li>You can't bet on more than 1 date</li>
        <li>On the day she's born, I'll report the date to the contract, which will send it's entire balance to the winner/s</li>
        <li>Winner takes all. If there is a tie, balance will be split equally amongst the winners</li>
        <li>I can't bet</li>
        <li>Bets can only take place within a given time span</li>
      </ul>
    </div>
  )
};

export default Rules;