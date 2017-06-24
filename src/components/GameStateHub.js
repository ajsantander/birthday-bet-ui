import React from 'react';

import PlaceBets from './gamestates/PlaceBets';
import BetPlaced from './gamestates/BetPlaced';
import BetsClosed from './gamestates/BetsClosed';
import Winner from './gamestates/Winner';

const GameStateHub = ({ gameState,
                        betDate,
                        gameBalance,
                        withdrawPrizeStatus,
                        placeBetSuccess,
                        placeBetStatus,
                        unitBet,
                        handlePlaceBet,
                        numWinners,
                        winPrize,
                        winDate,
                        withdrawPrizeSuccess,
                        handleWithdrawPrize,
                        isWinner,
                        lastDayToBet }) => {
  return (
    <div>
      {(() => {
        switch(gameState) {

          // BETS OPEN
          case 'betsAreOpen':
            if(betDate) {
              return <BetPlaced
                minDate={lastDayToBet}
                betDate={betDate}
              />;
            }
            else {
              return <PlaceBets
                gameBalance={gameBalance}
                minDate={lastDayToBet}
                placeBetSuccess={placeBetSuccess}
                unitBet={unitBet}
                placeBetStatus={placeBetStatus}
                handlePlaceBet={handlePlaceBet}
              />;
            }

          // BETS CLOSED
          case 'betsAreClosed':
            return <BetsClosed
              betDate={betDate}
              minDate={lastDayToBet}
            />;

          // BETS RESOLVED
          case 'betsResolved':
            return <Winner
              withdrawPrizeSuccess={withdrawPrizeSuccess}
              betDate={betDate}
              numWinners={numWinners}
              winPrize={winPrize}
              winDate={winDate}
              withdrawPrizeStatus={withdrawPrizeStatus}
              handleWithdrawPrize={handleWithdrawPrize}
              isWinner={isWinner}
            />;

          default:
            return <br/>;
        }
      })()}
    </div>
  )
};

export default GameStateHub;