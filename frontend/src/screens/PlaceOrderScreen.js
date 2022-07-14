import React, { useEffect, useContext } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { langContext } from "../components/LanguageContext";

import { fadeInRight,fadeInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contextLang } = useContext(langContext);

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.12 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [success, navigate, dispatch, cart, order]);
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const styles = {
    fadeInRight: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
    },
    fadeInLeft: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInLeft, "fadeInLeft"),
    }
  };
  return (
    <StyleRoot>
    
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
        <div style={styles.fadeInLeft}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Shipping" : "تفاصيل الشحن"}</h2>

              <p>
                <strong>
                  {contextLang === "en" ? "Shipping" : "عنوان الشحن"}:{" "}
                </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Payment Method" : "طريقة الدفع"}</h2>
              <p>
                <strong>
                  {contextLang === "en" ? "Method" : "طريقة الدفع"}:{" "}
                </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Order Items" : "الطلبيات"}</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">
                  {contextLang === "en"
                    ? "Your Cart Is Empty"
                    : "لا نوجد منتجات"}
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
          </div>
        </Col>

        <Col md={4}>
          <div style={styles.fadeInRight}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{contextLang === "en" ? "Order Summary" : "ملخص الطلب"}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    {contextLang === "en"
                      ? "Items Price"
                      : "اجمالي سعر المنجات"}
                  </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Shipping" : "الشحن"}:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Tax" : "الضرائب"}:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Total" : "الاجمالي"}:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="text-center">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  {contextLang === "en" ? "Place Order" : "اضافة طلب"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </div>
        </Col>
      </Row>
  
    </StyleRoot>
  );
}

export default PlaceOrderScreen;
