import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import { langContext } from "../components/LanguageContext";

import { fadeInRight } from "react-animations";
import Radium, { StyleRoot } from "radium";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contextLang } = useContext(langContext);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
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
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">{contextLang === "en" ? "Select Method" : "اختر طريقة الدفع"}</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className='my-2'>
        {contextLang === "en" ? "Continue" : "متابعة"}
        </Button>
      </Form>
    </FormContainer>
    </div>
    </StyleRoot>
  );
}

export default PaymentScreen;
