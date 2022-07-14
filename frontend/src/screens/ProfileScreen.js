import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import { langContext } from "../components/LanguageContext";

import { fadeInRight,fadeInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextLang } = useContext(langContext);

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

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


  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage('');
    }
  };
  return (
    <StyleRoot>
    <Row>
      
      <Col md={3}>
      <div style={styles.fadeInLeft}>
        <h2>{contextLang === "en" ? "MY PROFILE" : "صفحتي الشخصية"}</h2>

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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>{contextLang === "en" ? "Confirm Password" : "تأكيد كلمة السر"}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
          {contextLang === "en" ? "Update" : "تحديث"}
          </Button>
        </Form>
        </div>
      </Col>
     
      
      <Col md={9}>
        <div style={styles.fadeInRight}>
        <h2>{contextLang === "en" ? "My Orders" : "طلبياتي"}</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm text-center">
            <thead>
              <tr>
                <th>{contextLang === "en" ? "ID" : "رقم الطلب"}</th>
                <th>{contextLang === "en" ? "DATE" : "التاريخ"}</th>
                <th>{contextLang === "en" ? "TOTAL" : "الاجمالي"}</th>
                <th>{contextLang === "en" ? "PAID" : "حالة الدفع"}</th>
                <th>{contextLang === "en" ? "Delivered" : "حالة التسليم"}</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">{contextLang === "en" ? "Details" : "التفاصيل"}</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
          </div>
      </Col>
    
    </Row>
    </StyleRoot>
  );
}

export default ProfileScreen;
