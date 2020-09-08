import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({
  title,
  body,
  showModal,
  handleDismiss,
  handleAccept,
}) => {
  const handlerDismiss = () => {
    handleDismiss();
  };

  const handlerAccept = () => {
    handleAccept();
  };
  return (
    <Modal show={showModal} onHide={handlerDismiss} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlerDismiss}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handlerAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
