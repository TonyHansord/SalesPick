import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

function CustomerModal({ show, handleClose, setCustomerList }) {
  const [customer, setCustomer] = useState({
    name: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');

    fetch('/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customer.name,
        address: {
          street: customer.street,
          suburb: customer.suburb,
          state: customer.state,
          postcode: customer.postcode,
        },
        phone_number: customer.phone,
        email: customer.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomerList((customerList) => [...customerList, data]);
      });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="new-customer-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="customer-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="customer-address">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={customer.street}
              onChange={(e) =>
                setCustomer({ ...customer, street: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="suburb">
            <Form.Label>Suburb</Form.Label>
            <Form.Control
              type="text"
              placeholder="Suburb"
              value={customer.suburb}
              onChange={(e) =>
                setCustomer({ ...customer, suburb: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              value={customer.state}
              onChange={(e) =>
                setCustomer({ ...customer, state: e.target.value })
              }
            />
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postcode"
              value={customer.postcode}
              onChange={(e) =>
                setCustomer({ ...customer, postcode: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
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
