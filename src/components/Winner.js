import React from 'react';

class Winner extends React.Component {

  setAccountInputField(input) {
    this.accountInputField = input;
  }

  handleButtonClick() {
    let acctIndex = +this.accountInputField.value;
    this.props.handleWithdrawPrize(acctIndex);
  }

  render() {

    let {numWinners, winPrize, winDate} = this.props;

    return (
      <div>

        <h2>And the winner is!</h2>

        <p>Win date: {winDate}</p>
        <p>Winners: {numWinners}</p>
        <p>Each winner gets: {winPrize} ETH</p>
        <p>Note: This game doesn't send prizes to the winners, each winner needs to withdraw the prize.</p>

        <input
          type="text"
          defaultValue="1"
          className="form-control"
          ref={ref => this.setAccountInputField(ref)}
        />

        <button onClick={(evt) => this.handleButtonClick()}>Withdraw Prize!</button>
      </div>
    )
  }
}

export default Winner;