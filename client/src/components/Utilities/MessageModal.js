import { Modal, Button } from 'react-bootstrap';

function MessageModal({
  show,
  handleClose,
  title,
  message,
  closeButtonText,
  primaryButtonText,
  handlePrimary,
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrimary}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
