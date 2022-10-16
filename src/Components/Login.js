import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const login = (event) => {
    event.preventDefault();
    setLoginSuccess(false);
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginSuccess(true);
      })
      .catch((error) => setPasswordError(error.message));
  };
  const getUserEmail = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    console.log(email);
  };
  const resetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2 className="text-primary text-center my-5">Please Login </h2>

      <Form onSubmit={login} className="container">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col sm={10}>
            <Form.Control
              type="email"
              onBlur={getUserEmail}
              name="email"
              placeholder="Email"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 5 }}>
              <Form.Check
                type="radio"
                label="accept terms and condition"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Col sm={{ span: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
          <Col className="mt-4" sm={{ span: 10 }}>
            {loginSuccess && <p className="text-success">Login Successful</p>}
            <p className="text-danger">{passwordError}</p>
            <p onClick={resetPassword} className="text-primary">
              Forgot Password?
            </p>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
