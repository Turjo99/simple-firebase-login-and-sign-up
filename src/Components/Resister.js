import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import app from "../firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth(app);
const Resister = () => {
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  //register
  const register = (event) => {
    setLoginSuccess(false);
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const form = event.target;
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Please enter atleast two uppercase letters");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password Should be atleast 6 characters");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("Password should have atleast one special character");
      return;
    }
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginSuccess(true);
        form.reset();
        verifyEmail();
      })
      .catch((error) => setPasswordError(error.message));
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser).then(
        alert("Verification sent to your email address. Please Check")
      );
    };
  };
  return (
    <div className="container">
      <Form onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>

        {loginSuccess && (
          <p className="text-success">Successfully Account Created</p>
        )}

        <p className="text-danger">{passwordError}</p>
      </Form>
    </div>
  );
};

export default Resister;
