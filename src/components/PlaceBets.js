import React from 'react';

class PlaceBets extends React.Component {

  setDateInputField(input) {
    this.dateInputField = input;
  }

  setAccountInputField(input) {
    this.accountInputField = input;
  }

  handleButtonClick() {
    let date = new Date(this.dateInputField.value);
    let acctIndex = +this.accountInputField.value;
    this.props.handlePlaceBet(date, acctIndex);
  }

  render() {

    let {placeBetStatus} = this.props;

    return (
      <div>

        <h2>Place Bets</h2>

        <p>Select date:</p>
        <input
          type="text"
          defaultValue="1"
          className="form-control"
          ref={ref => this.setAccountInputField(ref)}
        />
        <input
          type="text"
          defaultValue="July 17, 2017"
          className="form-control"
          ref={ref => this.setDateInputField(ref)}
        />

        <button type="submit" onClick={(evt) => this.handleButtonClick()}>Place Bet</button>
        <p>{placeBetStatus}</p>
      </div>
    )
  }
}

export default PlaceBets;