import { Modal, Form, Card, Button, Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function PhotosModal({ show, handleClose, order, fetchOrder }) {
  const renderPhotos = () => {
    console.log(order.order_images);

    return order.order_images.length ? (
      order.order_images.map((photo, index) => {
        return (
          <Container key={index} id={index} className="orderPhoto">
            <Card.Img src={photo} />
            <Button onClick={handleRemovePhoto}>
              <Icon.TrashFill />
            </Button>
          </Container>
        );
      })
    ) : (
      <p>No photos</p>
    );
  };

  const handleAddPhoto = (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append('order_images', e.target.files[0]);

    fetch(`/api/orders/${order.id}/photos`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchOrder();
      });
    e.target.onreset = () => (e.target.value = null);
  };

  const handleRemovePhoto = (e) => {
    console.log(e.target.parentElement.id);

    const targetID = parseInt(e.target.parentElement.id);
    console.log(targetID);

    fetch(`/api/orders/${order.id}/photos/${targetID}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchOrder();
      });
  };

  return (
    <Modal show={show} onHide={handleClose} className="addProduct">
      <Modal.Header closeButton>
        <Modal.Title>Photos</Modal.Title>
      </Modal.Header>
      <Form.Group controlId="orderPhotos">
        <Form.Control
          type="file"
          accept="image/*"
          multiple={false}
          value={''}
          onChange={(e) => {
            handleAddPhoto(e);
          }}
        />
      </Form.Group>
      <Modal.Body>
        <div className="photos">{renderPhotos()}</div>
      </Modal.Body>
    </Modal>
  );
}

export default PhotosModal;
