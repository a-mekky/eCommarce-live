import React, { useState, useEffect,useContext } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { langContext } from "../components/LanguageContext";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function OrderScreen() {
  //from.super.app@gmail.com
  //!@#$ABcd123456
  //!@#135$Ab135
  //AXgR7tOfZdStinVnbmwbt6ADkACBVvbNW-AH8UseoAA0fvXhHrBfK4cX2gU0INSoyPtlvAyR1DMojf0l
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { contextLang } = useContext(langContext);


  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }


  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!order || successPay || order._id !== Number(id) || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        setSdkReady(true);
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, order, id, successDeliver, userInfo,navigate]);

 

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>{contextLang === "en" ? "Order:" : "رقم الطلب:"} {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Shipping Details" : "تفاصيل الشحن"} </h2>
              <p>
                <strong>{contextLang === "en" ? "Name" : "الاسم"}: </strong> {order.user.name}
              </p>
              <p>
                <strong>{contextLang === "en" ? "Email" : "البريد الالكتروني"}: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>{contextLang === "en" ? "Shipping Address" : "عنوان الشحن"}: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {'  '}
                {order.shippingAddress.postalCode},{'  '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  {contextLang === "en" ? "Delivered" : "تم التوصيل"} {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">{contextLang === "en" ? "Not Delivered" : "لم يتم التوصيل"}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Payment Method" : "طريقة الدفع"}</h2>
              <p>
                <strong>{contextLang === "en" ? "Method" : "طريقة الدفع"}: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">{contextLang === "en" ? "Paid on" : "تاريخ الدفع"} {order.paidAt}</Message>
              ) : (
                <Message variant="warning">{contextLang === "en" ? "Not Paid" : "لم يتم الدفع"}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{contextLang === "en" ? "Order Items" : "المنتجات المطلوبة"}</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">{contextLang === "en" ? "Order Is Empty" : "لا توجد منتجات"}</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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

                        <Col md={4}>{`
                          ${item.qty} X $ ${item.price} = $
                          ${(item.qty * item.price).toFixed(2)}
                          `}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{contextLang === "en" ? "Order Summary" : "مخلص الطلب"}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Total Items Price" : "اجمالي سعر المنتجات"}: </Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Shipping Price" : "سعر الشحن"}: </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Tax" : "الضرائب"}: </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>{contextLang === "en" ? "Total" : "الاجمالي"}: </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && !userInfo.isAdmin && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider options={{ "client-id": "AR-t-80khnKWs5jofplJecqkDVX5yJTZYOcGTYb8bAIafLj4FyKYYp3vPlBlf2F1N5YE9Gfws0Hw-F_d" }} >
                    <PayPalButtons
                    createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: order.totalPrice,
                                },
                            },
                        ],
                    });
                }}
                   
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(() => {
                          {successPaymentHandler()};
                      });
                  }}
                     />
                     </PayPalScriptProvider>
                    
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className="text-center">
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    {contextLang === "en" ? "Mark As Deliverd" : "اتمام التسليم"}
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
