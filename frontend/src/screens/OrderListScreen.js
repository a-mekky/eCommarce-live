import React, {  useEffect, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import { langContext } from "../components/LanguageContext";

import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const { contextLang } = useContext(langContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const styles = {
    zoomIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(zoomIn, "zoomIn"),
    }
  };
  return (
    <StyleRoot>
    <div style={styles.zoomIn}>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>{contextLang === "en" ? "ID" : "رقم الطلب"}</th>
              <th>{contextLang === "en" ? "USER" : "المستخدم"}</th>
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
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                    {contextLang === "en" ? "DETAILS" : "التفاصيل"}
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    </StyleRoot>
  );
}

export default OrderListScreen;
