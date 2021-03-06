import React from 'react';

import PlaceBets from './gamestates/PlaceBets';
import BetPlaced from './gamestates/BetPlaced';
import BetsClosed from './gamestates/BetsClosed';
import Winner from './gamestates/Winner';
import NoChain from './info/NoChain';

const GameStateHub = ({ gameState,
                        betDate,
                        gameBalance,
                        withdrawPrizeStatus,
                        network,
                        placeBetSuccess,
                        connected,
                        placeBetStatus,
                        unitBet,
                        handlePlaceBet,
                        numWinners,
                        winPrize,
                        winDate,
                        withdrawPrizeSuccess,
                        handleWithdrawPrize,
                        placingBet,
                        isWinner,
                        lastDayToBet }) => {
  return (
    <div>
      {(() => {
        switch(gameState) {

          // BETS OPEN
          case 'betsAreOpen':
            if(betDate || placingBet) {
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
            return <NoChain
              connected={connected}
            />;
        }
      })()}
    </div>
  )
};

export default GameStateHub;