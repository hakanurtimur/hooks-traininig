import React, { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
      return ({value: action.value, isValid: action.value.includes('@')})
    }
    if(action.type === 'INPUT_BLUR') {
      return ({value: state.value, isValid: state.value.includes('@')})
    }

    return ({value: '', isValid: false})

}


const passwordReducer = (state, action) => {
  if(action.type === 'PASSWORD_INPUT' ) {
    return ({value: action.value, isValid: action.value.trim().length > 6 })
  }
  if(action.type === 'PASSWORD_BLUR' ) {
    return ({value: state.value, isValid: state.value.trim().length > 6 })
  }
  return({value: '', isValid: undefined})
}

const Login = (props) => {

  
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // Schwarzmüller did it.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null}) 

  // I did it... 

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: undefined})

// alias assignment
  const {isValid: emailValidation} = emailState;
  const {isValid: passwordValidation } = passwordState;

  useEffect(() => {
    
    const identifier = setTimeout(() => {
      console.log("updated!!");
      setFormIsValid(
        emailValidation && passwordValidation
      );
      //CLEAN UP FUNCTİON
    }, 500);
    return () => {
      console.log("CLEAN UP!");
      clearTimeout(identifier)
    };
  }, [emailValidation, passwordValidation]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', value: event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
