import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Emoji from '../Emoji/Emoji';

function ErrorModal(props) {
  const { isOpen, data, closeHandler } = props;
  const { message } = data;

  return (
    <Modal
      size="sm"
      show={isOpen}
      onHide={closeHandler}
      aria-labelledby="error-modal"
      centered
      backdropClassName="bg-light"
    >
      <Modal.Header closeButton onHide={closeHandler}>
        <Modal.Title id="error-modal">
          <Emoji symbol="🤫" />
          <span>Ooops...</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
    </Modal>
  );
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ErrorModal;
