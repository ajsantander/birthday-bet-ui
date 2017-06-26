import React from 'react';
import * as DateUtil from '../../utils/DateUtil';

const BetPlaced = ({minDate, betDate}) => {
  return (
    <div>

      <h2>
        <span className={`label label-${betDate?  "success" : "default"}`}>
          {betDate ? 'You have placed your bet!' : 'Placing bet...'}
        </span>
      </h2>

      <br/>

      {betDate &&
      <div>
          <span>You bet on {DateUtil.dateToStr(betDate)}.
        Please come back after {DateUtil.dateToStr(minDate)} to see
        if you've won.</span>
        <span>If you do get lucky, you'll be able to withdraw your prize here.
        And sorry, no, there is no way to change your bet once
        its placed =(</span>
      </div>
      }

    </div>
  )
};

export default BetPlaced;