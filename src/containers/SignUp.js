import React, { useState } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./SignUp.css";
import Auth from "@aws-amplify/auth";

export default function SignUp(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 6 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          {/* <ControlLabel>Confirmation Code</ControlLabel> */}
          <FormControl
            autoFocus
            placeholder="Confirmation Code"
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the confirmation code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Confirm Email
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          {/* <ControlLabel>Email</ControlLabel> */}
          <FormControl
            autoFocus
            placeholder="Email"
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          {/* <ControlLabel>Password</ControlLabel> */}
          <ControlLabel>Password Requirements</ControlLabel>
          <ul>
            <li>Minimum 8 characters</li>
            <li>Lowercase letter(s)</li>
            <li>Uppercase letter(s)</li>
            <li>At least one number</li>
          </ul>
          <FormControl
            placeholder="Password"
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          {/* <ControlLabel>Confirm Password</ControlLabel> */}
          <FormControl
            type="password"
            placeholder="Confirm Password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Account
        </LoaderButton>
        <br></br>
        <div>
        <center>
        <LinkContainer to="/signin">
          <Link>Sign In</Link>
        </LinkContainer> 
        </center>  
      </div>
      </form>
    );
  }

  return (
    <div className="SignUp">
        <div className="Home">
            <div className="lander">
                <h1>GORP</h1>
            </div>
        </div>  
        {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}