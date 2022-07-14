import React, { useState, useEffect,useContext } from 'react';
import {
  Link,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { langContext } from "../components/LanguageContext";

import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let redirect = searchParams.get('redirect');
  redirect = redirect ? '/' + redirect : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const { contextLang } = useContext(langContext);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const styles = {
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    }
  };

  return (
    <>
    <StyleRoot>
      <div style={styles.fadeIn}>
    <FormContainer>
      <h1>{contextLang === "en" ? "Sign In" : "تسجيل الدخول"}</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>{contextLang === "en" ? "Email Address" : "البريد الالكتروني"}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{contextLang === "en" ? "Password" : "كلمة السر"}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
        {contextLang === "en" ? "Sign In" : "تسجيل الدخول"}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
        {contextLang === "en" ? "New Custimer?" : "ليس لديك حساب؟"}
          {' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          {contextLang === "en" ? "Register" : "انشاء حساب"}
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </div>
    </StyleRoot>


    </>
  );
}

export default LoginScreen;
