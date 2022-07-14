import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { langContext } from "../components/LanguageContext";

import { fadeInRight } from "react-animations";
import Radium, { StyleRoot } from "radium";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { contextLang } = useContext(langContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
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
      <CheckoutSteps step1 step2 />
      <h1>{contextLang === "en" ? "Shipping" : "تفاصيل الشحن"}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>{contextLang === "en" ? "Address" : "العنوان"}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className='my-2'>
          <Form.Label>{contextLang === "en" ? "City" : "المدينة"}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className='my-2'>
          <Form.Label>{contextLang === "en" ? "Postal Code" : "الرقم البريدي"}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className='my-2'>
          <Form.Label>{contextLang === "en" ? "Country" : "الدولة"}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
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

export default ShippingScreen;
