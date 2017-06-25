import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class HowTo extends React.Component {

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

        <h2>How to play</h2>
        <p>Use chrome with the metamask chrome extension, pick a date and place your bet. Thats it!</p>

        {/* SHOW MODAL */}
        <Button
          onClick={() => this.openModal()}>
          I Still Need Help
        </Button>

        {/* MODAL */}
        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>How to Play This Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This experiment will only run in chrome, with the metamask extension installed.
              See: <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">metamask.io</a>
            </p>
            <p>Once the extension is installed, you will need to switch to the ropsten testnet by selecting the
            network in the upper left corner of the extension's window.</p>
            <p>To get some free ETH to bet, you may use metamask's testnet faucet: <a href="https://faucet.metamask.io/" target="_blank" rel="noopener noreferrer">faucet.metamask.io</a></p>
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

export default HowTo;