import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

function CustomerModal({ show, setShowModal }) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerSuburb, setCustomerSuburb] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerPostcode, setCustomerPostcode] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="new-customer-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="customer-name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Customer Name" />
          </Form.Group>
          <Form.Group className="form-group" controlId="customer-address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" />
          </Form.Group>
          <Form.Group className="form-group" controlId="suburb">
            <Form.Label>Suburb</Form.Label>
            <Form.Control type="text" placeholder="Suburb" />
          </Form.Group>
          <Form.Group className="form-group" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
            <Form.Label>Postcode</Form.Label>
            <Form.Control type="text" placeholder="Postcode" />
          </Form.Group>
          <Form.Group className="form-group" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="phone" placeholder="Phone Number" />
          </Form.Group>
          <Form.Group className="form-group" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CustomerModal;
