import React, { useState, useEffect,useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { langContext } from "../components/LanguageContext";

import { fadeInRight } from "react-animations";
import Radium, { StyleRoot } from "radium";

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let redirect = searchParams.get('redirect');
  redirect = redirect ? redirect : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const { contextLang } = useContext(langContext);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const styles = {
    fadeInRight: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
    }
  };

  return (
    <StyleRoot>
      <div style={styles.fadeInRight}>
    <FormContainer>
      <h1>{contextLang === "en" ? "Register" : "انشاء حساب"}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>{contextLang === "en" ? "Name" : "الاسم"}</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>{contextLang === "en" ? "Email Address" : "البريد الالكتروني"}</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{contextLang === "en" ? "Password" : "كلمة السر"}</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>{contextLang === "en" ? "Confirm Password" : "تأكيد كلمة السر"}</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
        {contextLang === "en" ? "Register" : "تسجيل"}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {contextLang === "en" ? "Have An Account?" : "لديك حساب بالفعل؟"}{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          {contextLang === "en" ? "Login" : "سجل دخولك"}
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
    </StyleRoot>
  );
}

export default RegisterScreen;
