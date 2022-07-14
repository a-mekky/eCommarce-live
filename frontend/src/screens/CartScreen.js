import React, { useEffect, useContext } from "react";
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { langContext } from "../components/LanguageContext";

import { slideInRight } from "react-animations";
import Radium, { StyleRoot } from "radium";

export default function CartScreen() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const { contextLang } = useContext(langContext);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  const qty = Number(searchParams.get("qty"));

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, dispatch, qty]);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const styles = {
    slideInRight: {
      animation: "x 1s",
      animationName: Radium.keyframes(slideInRight, "slideInRight"),
    },
  };
  return (
    <StyleRoot>
       <div style={styles.slideInRight}>
        <Row>
         
            <Col md={8}>
              <h1>
                {contextLang === "en" ? "SHOPPING CART" : "سلة المشتريات"}
              </h1>
              {cartItems.length === 0 ? (
                <Message variant="info">
                  {contextLang === "en" ? "Your Cart Is Empty" : "السلة فارغة"}{" "}
                  <Link to="/">
                    {contextLang === "en" ? "Go Back" : "العودة"}
                  </Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={3}>Price: ${item.price}</Col>

                        <Col md={2}>
                          <Form.Select
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>

                        <Col md={1}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>

            <Col md={4}>
              <div className="my-4">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      {contextLang === "en" ? "SUBTOTAL" : "اجمالي المنتجات"} (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      {contextLang === "en" ? " Item" : " منتج"}
                    </h2>
                    <p>
                      Total Products Price:
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                      </p>
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item className="text-center">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    {contextLang === "en"
                      ? "Proceed To Checkout"
                      : "الانتقال الي الدفع"}
                  </Button>
                </ListGroup.Item>
              </Card>
              </div>
            </Col>
          
        </Row>
        </div>
    </StyleRoot>
  );
}
