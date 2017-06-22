import React from 'react';

const Rules = () => {
  return (
    <div className="container">
      <h2>Rules</h2>
      <p>All the rules and funtionality below are set and enforced by an ethereum smart contract.</p>
      <ul className="list-group">
        <li className="list-group-item">Fixed bet of 0.5 eth</li>
        <li className="list-group-item">You can't bet on more than 1 date</li>
        <li className="list-group-item">On the day she's born, I'll report the date to the contract, which will send it's entire balance to the winner/s</li>
        <li className="list-group-item">Winner takes all. If there is a tie, balance will be split equally amongst the winners</li>
        <li className="list-group-item">I can't bet</li>
        <li className="list-group-item">Bets can only take place within a given time span</li>
      </ul>
    </div>
  )
};

export default Rules;