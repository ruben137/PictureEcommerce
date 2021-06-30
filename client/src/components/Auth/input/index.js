import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ handleChange, name, type, placeholder }) => {
  return (
    <>
      <Form.Control
        className="bg-dark text-light"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default Input;
