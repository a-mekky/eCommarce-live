import React,{useContext} from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { langContext } from "../components/LanguageContext";

function CheckoutSteps({ step1, step2, step3, step4 }) {

  const { contextLang } = useContext(langContext);
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>{contextLang === "en" ? "Login" : "تسجيل الدخول"}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{contextLang === "en" ? "Login" : "تسجيل الدخول"}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>{contextLang === "en" ? "Shipping" : "الشحن"}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{contextLang === "en" ? "Shipping" : "الشحن"}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{contextLang === "en" ? "Payment" : "الدفع"}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{contextLang === "en" ? "Payment" : "الدفع"}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{contextLang === "en" ? "Place Order" : "اضافة طلب"}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{contextLang === "en" ? "Place Order" : "اضافة طلب"}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
