import { Modal, Form, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { MessageContext } from '../../App';



export function UserModal({ show, handleClose, setUsers, data, action }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: 'admin',
  });
  const { displayMessage } = useContext(MessageContext);
  

  useEffect(() => {
    if (data) {
      setUser({
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        role: data.role,
      });
    }
  }, [data]);

  const handleAddUser = () => {
    fetch('/api/users', {
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

  const handleEditUser = () => {
    fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        username: user.username,
        role: user.role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        displayMessage(data.message, 'success');
        handleClose();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'new') {
      handleAddUser();
    } else {
      handleEditUser();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          {action === 'new' ? (
            <Form.Group className="form-group" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Form.Group>
          ) : null}
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

export function PasswordModal({handleClose, show, user}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { displayMessage } = useContext(MessageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/users/${user}/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        confirm_password: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
        displayMessage(data.message, 'success');
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group" controlId="userConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
