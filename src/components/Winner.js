import React from 'react';

const Winner = ({numWinners, winPrize, winDate}) => {

  const setAccountInputField = (input) => {
    this.accountInputField = input;
  };

  const handleButtonClick = () => {
    const acctIndex = +this.accountInputField.value;
    this.props.handleWithdrawPrize(acctIndex);
  };

  return (
    <div>

      <h2>And the winner is!</h2>

      <p>Win date: {winDate}</p>
      <p>Winners: {numWinners}</p>
      <p>Each winner gets: {winPrize} ETH</p>
      <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>

      <input
        type="text"
        defaultValue="1"
        className="form-control"
        ref={ref => setAccountInputField(ref)}
      />

      <button onClick={(evt) => handleButtonClick()}>Withdraw Prize!</button>
    </div>
  )
};

export default Winner;