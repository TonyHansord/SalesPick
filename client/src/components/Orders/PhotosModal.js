import { Modal, Form, Card, Button, Container, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';

function PhotosModal({ show, handleClose, order, fetchOrder }) {
  const [spinner, setSpinner] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const handleShowSpinner = () => {
    setSpinner(true);
    setShowGallery(false);
  };

  const handleHideSpinner = () => {
    setSpinner(false);
    setShowGallery(true);
  };

  const handleShowGallery = (index) => {
    if (index === order.order_images.length - 1) {
      console.log('last photo');
      handleHideSpinner();
    }
  };

  useEffect(() => {
    if (!order.order_images.length) {
      handleHideSpinner();
    }
  }, [order]);

  const renderPhotos = () => {
    console.log(order.order_images);

    return order.order_images.length ? (
      order.order_images.map((photo, index) => {
        console.log('rendering photo ' + index);
        return (
          <Container key={index} id={index} className="orderPhoto">
            <Card.Img src={photo} onLoad={() => handleShowGallery(index)} />
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

    handleShowSpinner();
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
    handleShowSpinner();
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
        <div className="gallery" hidden={!showGallery}>
          {renderPhotos()}
        </div>
        <div id='spinner-container' hidden={!spinner}>
          <Spinner animation="border" role="status" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PhotosModal;
