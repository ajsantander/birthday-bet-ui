import React from 'react';
import * as DateUtil from '../utils/DateUtil';

const BetPlaced = ({minDate, betDate}) => {
  return (
    <div>

      <h2>
        <span className="label label-success">
          Your bet was placed!
        </span>
      </h2>

      <p>You bet on {DateUtil.dateToStr(betDate)}.
        Please come back after {DateUtil.dateToStr(minDate)} to see
        if you've won.</p>

      <p>If you get lucky, you'll be able to withdraw your prize here.
        And sorry, no, there is no way to change your bet once
        its placed =(</p>

    </div>
  )
};

export default BetPlaced;