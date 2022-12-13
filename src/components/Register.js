import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:3000/users/",
      data: {
        email,
        name,
        password,
        password_confirmation
      },
    };
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => { console.error(error); })
  }
  return (
    <>
      <h2>Register</h2>
      <Form>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password Confirmation:</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Password confirmation"
          ></Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >Submit</Button>
      </Form>
      {register ? (
        <p className="text-success">You Are Registered Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Registered</p>
      )}
    </>
  )
}

export default Register;
