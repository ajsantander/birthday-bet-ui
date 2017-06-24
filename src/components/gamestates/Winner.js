import React from 'react';
import { Button } from 'react-bootstrap';
import * as DateUtil from '../../utils/DateUtil';

const Winner = ({ numWinners,
                  winPrize,
                  winDate,
                  betDate,
                  withdrawPrizeStatus,
                  withdrawPrizeSuccess,
                  isWinner,
                  handleWithdrawPrize}) => {

  const handleButtonClick = () => {
    handleWithdrawPrize();
  };

  return (
    <div>

      <h2>And the winner is!</h2>

      {/*TODO: use labels with badges*/}
      <h2>
        <span className="label label-info">
          My daughter was born on &nbsp;
          <span className="badge">{DateUtil.dateToStr(winDate)}</span>
        </span>
      </h2>
      <h2>
        <span className="label label-info">
          Number of winners &nbsp;
          <span className="badge">{numWinners}</span>
        </span>
      </h2>
      <h2>
        <span className="label label-info">
          Each winner gets &nbsp;
          <span className="badge">{winPrize} ETH</span>
        </span>
      </h2>

      <br/>

      {betDate &&
        <p>You bet on {DateUtil.dateToStr(betDate)}.</p>
      }

      {/*TODO: display if the player is a winner*/}
      {isWinner &&
      <h1>
        <span className="label label-success">
          You've won!
        </span>
      </h1>
      }
      {!isWinner && !betDate &&
      <h1>
        <span className="label label-danger">
          You didn't place a bet ¯\_(ツ)_/¯
        </span>
      </h1>
      }

      {isWinner &&
        <div>
          <Button
            bsStyle="primary"
            bsSize="large"
            type="submit"
            onClick={(evt) => handleButtonClick()}>
            Withdraw Prize
          </Button>
          <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>
        </div>
      }

      <br/>

      {/* WITHDRAW SUCCESS FEEDBACK */}
      {withdrawPrizeSuccess &&
      <h2>
        <span className="label label-success">
          You've withdrawn your prize. Congratulations!
        </span>
      </h2>
      }

      {/* ERROR FEEDBACK */}
      {!withdrawPrizeSuccess && withdrawPrizeStatus !== undefined &&
      <div className='alert alert-danger'>
        <strong>{withdrawPrizeStatus}</strong>
      </div>}

    </div>
  )
};

export default Winner;