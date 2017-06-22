import React from 'react';
import {Button, Modal} from 'react-bootstrap';

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
    return (
      <div className="">

        <h2>Game Rules</h2>
        <p>All the rules and funtionality of this game are set but enforced by a smart contract written in Solidity, running in the Ethereum blockchain. Shame on me!</p>

        {/* SHOW MODAL */}
        <Button
          onClick={() => this.openModal()}>
          Review Rules
        </Button>

        {/* MODAL */}
        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Smart Contract Rules</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-danger">TODO!</div>

            <p>After bets close on XXX, I will report my daughter's birthdate to the contract
              and it will automatically send the prize to the winner/winners.</p>

            <p>You will have to return to this site after XXX and, if you are a winner,
              you will be able to withdraw the funds in this site.</p>

            <p>The following rules are enforced and have been tested on the contract:</p>
            <ul className="">
              <li className="">Fixed bet of 0.5 eth</li>
              <li className="">You can't bet on more than 1 date</li>
              <li className="">On the day she's born, I'll report the date to the contract, which will send it's entire balance to the winner/s</li>
              <li className="">Winner takes all. If there is a tie, balance will be split equally amongst the winners</li>
              <li className="">I can't bet</li>
              <li className="">Bets can only take place within a given time span</li>
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