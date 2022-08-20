import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.scss";
import { doLogin } from "../../redux/actions/authActions";
import { CLEAR_MESSAGE } from "../../redux/types";
import Toaster from "../Toaster/Toaster";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // get data from auth reducers
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  // get data from message reducers
  const { isError, message } = useSelector((state) => state.message);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  // if login error
  if (isError) {
    Toaster("error", message);
    dispatch({
      type: CLEAR_MESSAGE,
      payload: { isError: false },
    });
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // handle sign in button
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(doLogin(username, password)).then(() => {
      navigate(`/`);
    });
  };

  return (
    <div id="login-wrapper" className="login-wrapper container border p-0">
      <div className="d-flex justify-content-between gap-5">
        <div className="login-form d-flex align-items-center justify-content-center p-4">
          <Form className="w-85" onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <h4>Login Form</h4>
              <p>
                Welcome, please put your login credentials below to start using
                the app.
              </p>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column lg="2">
                Email
              </Form.Label>
              <Col lg="10">
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 border-bottom pb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column lg="2">
                Password
              </Form.Label>
              <Col lg="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCheck"
            >
              <div className="d-flex justify-content-between align-items-center">
                <Form.Check className="custom-checkbox" label="Remember me" />
                <Button
                  className="w-full text-white"
                  variant="primary"
                  disabled={isLoading}
                  onClick={!isLoading ? handleLogin : null}
                >
                  {isLoading ? "Loading…" : "Sign In"}
                </Button>
              </div>
            </Form.Group>

            <div className="vstack gap-4">
              <Form.Text className="d-flex justify-content-center" muted>
                Don't have an account? &nbsp;
                <Link className="text-primary" to={"#"}>
                  Sign up for free
                </Link>
              </Form.Text>
            </div>
          </Form>
        </div>
        <div className="figura-wrapper">
          <img className="bg" src="https://picsum.photos/600" alt="" />
        </div>
      </div>
    </div>
  );
}
