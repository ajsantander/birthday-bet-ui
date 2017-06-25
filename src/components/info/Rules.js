import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as DateUtil from '../../utils/DateUtil';

class Rules extends React.Component {

  constructor() {
    super();

    this.state = {
      showModal: false
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {

    let unitBet = this.props.unitBet ? this.props.unitBet : 'the unit bet';
    let lastDayToBet = this.props.lastDayToBet ? DateUtil.dateToStr(this.props.lastDayToBet) : 'the last day to bet';

    return (
      <div className="">

        <h2>Game Rules</h2>
        <p>All the rules and funtionality of this game are set and
          enforced by a smart contract written in Solidity,
          running in the Ethereum blockchain.</p>

        {/* SHOW MODAL */}
        <Button
          onClick={() => this.openModal()}>
          Review Rules
        </Button>

        {/* MODAL */}
        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Gabe/SmartContract Rules</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p>After bets close on {lastDayToBet}, I will report my daughter's birthdate to the contract
              and it will automatically send the prize to the winner/winners.</p>

            <p>You will have to return to this site after {lastDayToBet} and, if you are a winner,
              you will be able to withdraw the funds in this site.</p>

            <p>The following rules are enforced and have been tested on the contract:</p>
            <ul className="">
              <li className="">Fixed bet of {unitBet} eth. You can't bet more, you can't bet less.</li>
              <li className="">You can't bet on more than once, and you can't change your bet after you have submitted the transaction.</li>
              <li className="">On the day she's born, or probably a couple of days later when I finish freaking out, I'll report the date to the contract.</li>
              <li className="">Once I report the date to the contract, it will find the winners (whoever is closest to the true date), but it will not send prizes automatically. Players will have to check in and withdraw the prize themselves.</li>
              <li className="">If there is a tie, the contract's balance will be split equally amongst the winners.</li>
              <li className="">I can't bet.</li>
              <li className="">Bets can only take place until {lastDayToBet}, and I can only define the winning date after that.</li>
            </ul>

          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default Rules;