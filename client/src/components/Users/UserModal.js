import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function UserModal({ show, handleClose, setUsers }) {
  const [user, setUser] = useState({});

  const handleAddUser = (e) => {
    e.preventDefault();

    fetch('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        username: user.username,
        password: user.password,
        role: user.role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        handleClose();
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddUser}>
          <Form.Group className="form-group" controlId="userFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="userLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="userUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group" controlId="userRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value={'admin'}>Admin</option>
              <option value={'sales'}>Sales</option>
              <option value={'warehouse'}>Warehouse</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserModal;
