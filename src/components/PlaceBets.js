import React from 'react';

const PlaceBets = ({placeBetStatus, handlePlaceBet, minDate}) => {

  const setDateInputField = (input) => {
    this.dateInputField = input;
  };

  const handleButtonClick = () => {
    let date = new Date(this.dateInputField.value);
    handlePlaceBet(date);
  };

  const dateToStr = date => `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;

  return (
    <div>

      <h2>Place Bets</h2>

      <p>Select date:</p>

      <input
        type="date"
        defaultValue={dateToStr(minDate)}
        className="form-control"
        ref={ref => setDateInputField(ref)}
      />

      <button type="submit" onClick={(evt) => handleButtonClick()}>Place Bet</button>
      <p>{placeBetStatus}</p>
    </div>
  )
};

export default PlaceBets;