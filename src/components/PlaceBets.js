import React from 'react';

const PlaceBets = ({placeBetStatus}) => {

  const setDateInputField = (input) => {
    this.dateInputField = input;
  };

  const setAccountInputField = (input) => {
    this.accountInputField = input;
  };

  const handleButtonClick = () => {
    let date = new Date(this.dateInputField.value);
    let acctIndex = +this.accountInputField.value;
    this.props.handlePlaceBet(date, acctIndex);
  };

  return (
    <div>

      <h2>Place Bets</h2>

      <p>Select date:</p>
      <input
        type="text"
        defaultValue="1"
        className="form-control"
        ref={ref => setAccountInputField(ref)}
      />
      <input
        type="text"
        defaultValue="July 17, 2017"
        className="form-control"
        ref={ref => setDateInputField(ref)}
      />

      <button type="submit" onClick={(evt) => handleButtonClick()}>Place Bet</button>
      <p>{placeBetStatus}</p>
    </div>
  )
};

export default PlaceBets;