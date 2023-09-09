import { Modal, Form, Card } from 'react-bootstrap';

function PhotosModal({ show, handleClose, order, setOrder }) {
  const renderPhotos = () => {
    console.log(order.order_images);

    return order.order_images.length ? (
      order.order_images.map((photo, index) => {
        return (
          <Card key={index}>
            <Card.Img src={photo} />
          </Card>
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
        setOrder(data);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} className="addProduct">
      <Modal.Header closeButton>
        <Modal.Title>Photos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="orderPhotos">
          <Form.Control
            type="file"
            accept="image/*"
            multiple={false}
            // value={product.productImageURL}
            onChange={(e) => handleAddPhoto(e)}
            // placeholder="Image"
          />
        </Form.Group>

        {renderPhotos()}
      </Modal.Body>
    </Modal>
  );
}

export default PhotosModal;
