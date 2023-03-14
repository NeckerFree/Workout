import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLogin(false);
    const configuration = {
      method: "post",
      url: "http://localhost:3000/authenticate",
      data: {
        email,
        password
      },
    };
    axios(configuration)
      .then((result) => {
        //alert('token: ' + result.data.auth_token);
        cookies.set("TOKEN", result.data.auth_token, {
          path: "/",
        });
        cookies.set("USER", { id: result.data.auth_token, name: email, permissions: ['analyze', 'register'], roles: ['admin'] });
        if (result.data.auth_token) {
          setLogin(true);
        }
        setLoading(false);
        //window.location.href = "/trainings";
        return <Navigate to="/trainings" replace />;
      })
      .catch((error) => { console.error(error); })
  }
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >Submit</Button>
      </Form>
      {login ? (
        <p className="text-success">You Are Logged in Successfully, Welcome {email}!</p>
      ) : (
        <p className="text-danger">You Are Not Logged</p>
      )}
      <div>
        <div className="header-container">
          {loading === true
            ? <p><em>Loading... </em></p>
            : null
          }
        </div>
      </div>
    </>
  )
}

export default Login;
