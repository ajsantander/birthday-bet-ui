const code = `pragma solidity ^0.4.0;

contract BetOnDate {

    uint public unitBet;
    uint public lastDayToBet;

    address public owner;

    mapping (address => uint) bets;
    address[] players;

    function BetOnDate(uint _unitBet, uint _lastDayToBet, bool _isDebugging) {

        simulatedNow = now;

        owner = msg.sender;
        isDebugging = _isDebugging;
        unitBet = _unitBet;
        lastDayToBet = _lastDayToBet;
        currentGameState = GameState.betsAreOpen;

        maxDistance = 5184000; // seconds in 2 months
        minDistance = maxDistance;
    }

    modifier onlyIfDebugging() {
        if(isDebugging) _;
    }

    modifier onlyOwner() {
        if(msg.sender == owner) _;
    }

    /* --------------------
        Game State
       -------------------- */

    event GameStateChanged(uint state);

    enum GameState {
        betsAreOpen,
        betsAreClosed,
        betsResolved
    }
    GameState public currentGameState;

    function updateGameState(GameState state) private {
        if(currentGameState == state) return;

        currentGameState = state;

        uint gameStateIdx;
        if(currentGameState == GameState.betsAreOpen) {
            gameStateIdx = 0;
        }
        else if(currentGameState == GameState.betsAreClosed) {
            gameStateIdx = 1;
        }
        else if(currentGameState == GameState.betsResolved) {
            gameStateIdx = 2;
        }
        GameStateChanged(gameStateIdx);
    }

    function evaluateGameState() private {
        if(currentGameState == GameState.betsAreOpen && getTime() > lastDayToBet) {
            updateGameState(GameState.betsAreClosed);
        }
    }

    /* --------------------
        Game Resolution
       -------------------- */

    uint minDistance;
    uint maxDistance;
    uint public numWinners;
    uint totalPrize;
    uint public resolutionDate;
    mapping (address => uint) distances;
    mapping (uint => uint) distanceCounts;

    function resolve(uint _resolutionDate) onlyOwner {
        if(getTime() < lastDayToBet) { return; }

        resolutionDate = _resolutionDate;

        uint i;
        address player;
        uint betDate;
        uint distance;

        totalPrize = this.balance;

        // Calculate min distance to resolution date
        // and the distance of each player.
        for(i = 0; i < players.length; i++) {
            player = players[i];
            betDate = bets[player];
            if(resolutionDate > betDate) distance = resolutionDate - betDate;
            else distance = betDate - resolutionDate;
            distances[player] = distance;
            distanceCounts[distance] += 1;
            if(distance < minDistance) {
                minDistance = distance;
            }
        }

        numWinners = distanceCounts[minDistance];
        updateGameState(GameState.betsResolved);
    }

    /* --------------------
        Prize Withdrawal
       -------------------- */

    function withdrawPrize() {

        var (withdrawalIsValid, /*errorMsg*/) = validatePrizeWithdrawal();
        if(!withdrawalIsValid) {
            return;
        }

        uint prize = getPrize();
        msg.sender.transfer(prize);

        // Avoids winner from extracting a prize twice.
        distances[msg.sender] = maxDistance;
    }

    function getPrize() constant returns (uint) {
        return totalPrize / numWinners;
    }

    function validatePrizeWithdrawal() constant returns(bool, bytes32) {

        bool valid = true;
        bytes32 errorMsg = 'The withdrawal is valid.';

        evaluateGameState();

        if(valid && currentGameState != GameState.betsResolved) {
            errorMsg = 'Sorry, the game is not over.';
            valid = false;
        }

        if(valid && bets[msg.sender] == 0) {
            errorMsg = 'Sorry, you didnt place a bet.';
            valid = false;
        }

        if(distances[msg.sender] > minDistance) {
            errorMsg = 'Sorry, you didnt win the bet.';
            valid = false;
        }

        return (valid, errorMsg);
    }

    /* --------------------
        Placing Bets
       -------------------- */

    function placeBet(uint date) payable {

        var (betIsValid, /*errorMsg*/) = validateBet(date, msg.value);

        // return funds and abort if bet is invalid
        if(!betIsValid) {
            msg.sender.transfer(msg.value);
            return;
        }

        // record player bet
        bets[msg.sender] = date;
        players.push(msg.sender);
    }

    function validateBet(uint date, uint value) constant returns(bool, bytes32) {

        bool valid = true;
        bytes32 errorMsg = 'The bet is valid.';

        evaluateGameState();

        if(valid && currentGameState != GameState.betsAreOpen) {
            errorMsg = 'Sorry, bets are closed.';
            valid = false;
        }

        if(valid && date + 86400 < lastDayToBet) {
            errorMsg = 'Please, pick a later date.';
            valid = false;
        }

        if(valid && value != unitBet) {
            errorMsg = 'Please pay the minimum bet.';
            valid = false;
        }

        if(valid && bets[msg.sender] != 0) {
            errorMsg = 'You have already placed a bet.';
            valid = false;
        }

        if(valid && msg.sender == owner) {
            errorMsg = 'The game owner cannot play.';
            valid = false;
        }

        return (valid, errorMsg);
    }

    function getPlayerBetDate(address player) constant returns(uint) {
        return bets[player];
    }

    /* ---------------------------
        Debugging
       --------------------------- */

    bool public isDebugging;
    uint public simulatedNow;

    function setTime(uint date) onlyOwner onlyIfDebugging {
        simulatedNow = date;
        evaluateGameState();
    }

    function getTime() constant returns(uint) {
        if(isDebugging) { return simulatedNow; }
        else { return now; }
    }
}
`;

export default code;