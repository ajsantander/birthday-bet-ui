import React from 'react';
import { Button } from 'react-bootstrap'
import * as DateUtil from '../utils/DateUtil';

const PlaceBets = ({ placeBetStatus,
                     placeBetSuccess,
                     handlePlaceBet,
                     unitBet,
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
    <div className="">

      <h2>Place your bet</h2>

      <p>Bet value &nbsp;
      <span className="badge">{unitBet} ETH</span></p>

      <br/>

      <div className="form-group">
        <label>Pick a date. Winner takes all.</label>
        <input
          type="date"
          defaultValue={DateUtil.dateToStr(minDate, 'yyyy-mm-dd')}
          className="form-control"
          ref={ref => setDateInputField(ref)}
        />
        <br/>
        <Button
          bsStyle="primary"
          bsSize="large"
          type="submit"
          onClick={(evt) => handleButtonClick()}>Place Bet
        </Button>
      </div>

      {placeBetStatus !== undefined &&
      <div className={'alert ' + (placeBetSuccess ? 'alert-success' : 'alert-danger')}>
        <strong>{placeBetStatus}</strong>
      </div>}

    </div>
  )
};

export default PlaceBets;