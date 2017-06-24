import React from 'react';
import { Button } from 'react-bootstrap';
import * as DateUtil from '../../utils/DateUtil';

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

  return (
    <div className="">

      <h2>Pick a date. Winner takes all.</h2>

      <div className="form-group">

        {/* INFO */}
        <h3>
          <span className="label label-default">
            Bet value &nbsp;
            <span className="badge">{unitBet} ETH</span>
          </span>
        </h3>

        {/* DATE PICKER */}
        <input
          type="date"
          defaultValue={DateUtil.dateToStr(minDate, 'yyyy-mm-dd')}
          className="form-control"
          ref={ref => setDateInputField(ref)}
        />
        *YOU CAN ONLY BET ONCE, AND YOU CANNOT CHANGE YOUR BET*

        <br/>
        <br/>

        {/* PLACE BET */}
        <Button
          bsStyle="primary"
          bsSize="large"
          type="submit"
          onClick={(evt) => handleButtonClick()}>Place Bet
        </Button>
      </div>

      {/* ERROR FEEDBACK */}
      {placeBetSuccess === false && placeBetStatus !== undefined &&
      <div className='alert alert-danger'>
        <strong>{placeBetStatus}</strong>
      </div>}

    </div>
  )
};

export default PlaceBets;