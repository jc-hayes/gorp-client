import React, { useState } from "react";
import Auth from "@aws-amplify/auth";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Link } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import "./SignIn.css";

export default function SignIn(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });


  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  
    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);

    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="SignIn">
        <div className="Home">
            <div className="lander">
                <h1>GORP</h1>
            </div>
        </div>        
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
            <FormControl
                placeholder="Password"
                value={fields.password}
                onChange={handleFieldChange}
                type="password"
            />
            </FormGroup>
            <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
                Sign In
            </LoaderButton>            
            <p>
                <Link to="/signup">Sign up for account.</Link><br></br><br></br>
                <Link to="/">Forgot password.</Link>

            </p>
        </form>
    </div>
    );
}