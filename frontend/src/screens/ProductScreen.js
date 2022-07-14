import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import ReactImageZoom from "react-image-zoom";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { langContext } from "../components/LanguageContext";

import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

export default function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { contextLang } = useContext(langContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  const styles = {
    zoomIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(zoomIn, "zoomIn"),
    }
  };
  const imageZoom = {
    width: 400,
    height: 250,
    zoomWidth: 500,
    img: `${product.image}`,
    zoomPosition: "original",
    scale: 1.5,
  };

  return (
    <StyleRoot>
      <div style={styles.zoomIn}>
    <Container>
      <div>
        <Row>
          <Col md={2}>
            <Link to="/" className="btn btn-light my-3" style={{fontSize:'20px'}}>
              {contextLang === "en" ? "Go Back " : "العودة"}
            </Link>
          </Col>
          <Col md={{offset: 2}}>
            <h1>{contextLang === "en" ? "Product Details" : "تفاصيل المنتج"}</h1>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Row>
              <Col md={6}>
                {/* <Image src={product.image} alt={product.name} fluid /> */}
                <ReactImageZoom {...imageZoom} />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} ${
                        contextLang === "en" ? "Reviews " : ":تقييم"
                      }`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {contextLang === "en" ? "Price: " : " السعر:"} $
                    {product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {contextLang === "en" ? "Description: " : " الوصف:"}{" "}
                    {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              {!userInfo || userInfo && !userInfo.isAdmin &&(
              <Col md={3}>
                <Card>
                  
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          {contextLang === "en" ? "Price: " : " السعر:"}
                        </Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          {contextLang === "en" ? "Status: " : " الحالة:"}
                        </Col>
                        <Col>
                          {product.countInStock > 0
                            ? contextLang === "en"
                              ? "In Stock "
                              : " في المخزون"
                            : contextLang === "en"
                            ? "Out Of Stock "
                            : " غير متوفر"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            {contextLang === "en" ? "Quantity: " : " الكمية:"}
                          </Col>
                          <Col xs="auto" className="my-1">
                            <Form.Select
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item className="text-center">
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        {contextLang === "en"
                          ? "Add To Cart"
                          : " اضف الي السلة"}
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              )}
            </Row>
            {/* {userInfo == null || !userInfo && !userInfo.isAdmin &&( */}
            <Row>
              <Col md={6}>
                <br />
                <br />
                <br />
                <br />
                <h4>{contextLang === "en" ? "Reviews " : "التعليقات"}</h4>
                {product.reviews.length === 0 && (
                  <Message variant="info">
                    {contextLang === "en" ? "No Reviews" : "لا يوجد تعليقات"}
                  </Message>
                )}

                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>
                      {contextLang === "en" ? "Write A Review" : "اضف تعليق"}
                    </h4>

                    {loadingProductReview && <Loader />}
                    {successProductReview && (
                      <Message variant="success">
                        {contextLang === "en"
                          ? "Review Submitted: "
                          : "تم اضافة التعليق"}
                      </Message>
                    )}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>
                            {contextLang === "en" ? "Rating" : "ألتقييم"}
                          </Form.Label>
                          <Form.Select
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">
                              {contextLang === "en" ? "Select" : "اختر... "}
                            </option>
                            <option value="1">
                              1 - {contextLang === "en" ? "Poor " : "سئ"}
                            </option>
                            <option value="2">
                              2 - {contextLang === "en" ? "Fair" : "مقبول"}
                            </option>
                            <option value="3">
                              3 - {contextLang === "en" ? "Good: " : "جيد"}
                            </option>
                            <option value="4">
                              4 -{" "}
                              {contextLang === "en" ? "Very Good: " : "جيد جدا"}
                            </option>
                            <option value="5">
                              5 -{" "}
                              {contextLang === "en" ? "Excellent " : "ممتاز"}
                            </option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label>
                            {contextLang === "en" ? "Comment" : "التعليق"}
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            row="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          {contextLang === "en" ? "Submit" : "ارسال"}
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        {contextLang === "en" ? "Please" : "من فضلك"}{" "}
                        <Link to="/login">
                          {contextLang === "en" ? "Login" : "سجل دخولك"}
                        </Link>
                        {contextLang === "en"
                          ? "To Write A Review"
                          : "لتتمكن من التقييم"}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            {/* )} */}
          </div>
        )}
      </div>
    </Container>
    </div>
    </StyleRoot>
  );
}
