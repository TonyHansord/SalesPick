import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function LoginView({ setUser, setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      name: name,
      role: 'admin',
    });

    setIsLoggedIn(true);
  };

  return (
    <div className="login-view">
      <h1 className="login-title">SalesPick</h1>

      <Form noValidate onSubmit={handleLogin}>
        <h3>Login</h3>
        <Form.Group className="form-group" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
