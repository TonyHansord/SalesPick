import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function LoginView({ setUser, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          console.log(data);
          setUser(data);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          alert('Invalid username or password');
        }
      });
  };

  return (
    <div className="login-view">
      <h1 className="login-title">SalesPick</h1>

      <Form noValidate onSubmit={handleLogin}>
        <h3>Login</h3>
        <Form.Group className="form-group" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <button className="btn" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}

export default LoginView;
