import React, { useContext, useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import AuthContext from "../../contexts/Auth/AuthContext";
import { useHistory } from "react-router";
import Input from "./input";

const Auth = () => {
  const history = useHistory();
  const { signup, signin, error, loading } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [onSignup, setOnSignup] = useState(false);
  const [matchError, setMatchError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSignup) {
      if (form.password !== form.confirmPassword) {
        setMatchError(true);
        return;
      }

      signup(form, history);
    } else {
      signin(form, history);
    }
  };

  return (
    <Card style={{ width: "300px", padding: 10 }} bg="dark">
      <h3 className="text-center text-light">
        {onSignup ? "Register" : "Login"}
      </h3>
      <Form onSubmit={handleSubmit}>
        {onSignup && (
          <Form.Group controlId="formBasicName">
            <Input name="name" type="text" placeholder="Enter name" />
          </Form.Group>
        )}
        {onSignup && (
          <Form.Group controlId="formBasicLastName">
            <Input
              name="lastName"
              type="text"
              placeholder="Enter last name"
              handleChange={handleChange}
            />
          </Form.Group>
        )}

        {onSignup && (
          <Form.Group controlId="formBasicUserName">
            <Input
              name="userName"
              type="text"
              placeholder="Enter username"
              handleChange={handleChange}
            />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicEmail">
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
          />
        </Form.Group>
        {onSignup && (
          <Form.Group controlId="formBasicConfirmPassword">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onClick={() => setMatchError(false)}
              handleChange={handleChange}
            />
          </Form.Group>
        )}
        {matchError && (
          <Form.Text className="text-danger">
            Passwords does not match
          </Form.Text>
        )}
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        {loading && (
          <div className="pb-3">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {!onSignup && !loading && (
          <Form.Text style={{ fontSize: 15 }} className="text-light py-2">
            Don't have an account?{" "}
            <b style={{ cursor: "pointer" }} onClick={() => setOnSignup(true)}>
              Sign up
            </b>
          </Form.Text>
        )}
        {onSignup && !loading && (
          <Form.Text style={{ fontSize: 15 }} className="text-light py-2">
            Already have an account?{" "}
            <b style={{ cursor: "pointer" }} onClick={() => setOnSignup(false)}>
              Sign in
            </b>
          </Form.Text>
        )}
        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default Auth;
