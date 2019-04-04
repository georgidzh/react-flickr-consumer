import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Emoji from '../Emoji/Emoji';

function ErrorModal(props) {
  const { isOpen, errorMessage, closeHandler } = props;

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
          <Emoji icon="🤫" />
          <span>Ooops...</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
    </Modal>
  );
}

ErrorModal.defaultProps = {
  errorMessage: 'Something went wrong',
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  closeHandler: PropTypes.func.isRequired,
};

export default ErrorModal;
