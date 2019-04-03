import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import Emoji from '../../Emoji/Emoji';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      callback: null,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleShow(callback) {
    return (event) => {
      event.preventDefault();
      // hackish - https://reactjs.org/docs/events.html#event-pooling
      const e = {
        ...event,
        target: { ...event.target, value: event.target.value },
      };
      this.setState({
        isOpen: true,
        callback: () => callback(e),
      });
    };
  }

  handleClose() {
    this.setState({ isOpen: false, callback: null });
  }

  handleConfirm() {
    // eslint-disable-next-line react/destructuring-assignment
    this.state.callback();
    this.handleClose();
  }

  render() {
    const { children, title, text } = this.props;
    const { isOpen } = this.state;

    return (
      <React.Fragment>
        {children(this.handleShow)}
        {isOpen && (
          <Modal show={isOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <Emoji symbol="🤔" />
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleConfirm}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

Confirm.defaultProps = {
  title: 'Confirm',
  text: 'Are you sure about this?',
};

Confirm.propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Confirm;
