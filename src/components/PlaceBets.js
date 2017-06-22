import React from 'react';
import * as DateUtil from '../utils/DateUtil';

const PlaceBets = ({ placeBetStatus,
                     placeBetSuccess,
                     handlePlaceBet,
                     minDate}) => {

  const setDateInputField = (input) => {
    this.dateInputField = input;
  };

  const handleButtonClick = () => {
    let date = new Date(this.dateInputField.value);
    handlePlaceBet(date);
  };

  console.log('placeBetSuccess: ', placeBetSuccess);

  return (
    <div className="container">

      <h2>Place Bets</h2>

      <div className="form-group">
        <label>Select date:</label>
        <input
          type="date"
          defaultValue={DateUtil.dateToStr(minDate, 'yyyy-mm-dd')}
          className="form-control"
          ref={ref => setDateInputField(ref)}
        />
        <button
          className="btn btn-default"
          type="submit"
          onClick={(evt) => handleButtonClick()}>Place Bet
        </button>
      </div>

      {placeBetStatus !== undefined &&
      <div className={'alert ' + (placeBetSuccess ? 'alert-success' : 'alert-danger')}>
        <strong>{placeBetStatus}</strong>
      </div>}

    </div>
  )
};

export default PlaceBets;