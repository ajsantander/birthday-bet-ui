import React from 'react';
import * as DateUtil from '../../utils/DateUtil';

const BetsClosed = ({betDate, minDate}) => {
  return (
    <div>

      <h2>Sorry, bets are closed!</h2>

      {betDate &&
        <div>
          <span>You bet on {DateUtil.dateToStr(betDate)}.</span>
          <span>If you do get lucky, you'll be able to withdraw your prize here.
        And sorry, no, there is no way to change your bet once
        its placed =(</span>
        </div>
      }

      <span>Please come back after {DateUtil.dateToStr(minDate)} to see
        if you've won.</span>

    </div>
  )
};

export default BetsClosed;