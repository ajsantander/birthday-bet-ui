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
            <div className="alert alert-danger">TODO!</div>
            Lorem ipsum...
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