import React, {
  // useState,
  useEffect,
  useContext,
} from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  // useNavigate
} from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProducts,
  listCategory,
  listMostOrderdProducts,
} from "../actions/productActions";
import Paginate from "../components/Paginate";

import { langContext } from "../components/LanguageContext";

// import AdvertisementExampleCommonUnits from "../components/ads";
import CategoryFilter from "../components/CategoryFilter";

import { fadeIn, bounceInUp, fadeInRight, fadeInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";
import PriceFilter from "../components/PriceFilter";
import RateFilter from "../components/RateFilter";
import MostOrdered from "../components/MostOrdered";

function HomeScreen() {
  const styles = {
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
    bounceInUp: {
      animation: "x 3s",
      animationName: Radium.keyframes(bounceInUp, "bounceInUp"),
    },
    fadeInRight: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
    },
    fadeInLeft: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInLeft, "fadeInLeft"),
    },
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const { contextLang } = useContext(langContext);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages, range } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { error: catError, loading: catLoad } = categoryList;

  const location = useLocation();

  const keyword = location.search;
  // const [cat,setCat] = useState('')

  useEffect(() => {
    dispatch(listProducts(keyword));
    dispatch(listCategory());
    dispatch(listMostOrderdProducts());
  }, [dispatch, keyword]);

  // console.log(range,'sc')

  return (
    // <Container>
    <StyleRoot>
      <div>
        <Row>
          {!keyword && (
            <div className="my-2">
              <h1 style={styles.fadeIn} className="text-center">
                {contextLang === "en"
                  ? "TOP RATED PRODUCTS"
                  : "اعلي المنتجات تقيماً"}
              </h1>
              <Col md={12}>
                <Container fluid>
                 
                </Container>
                <br />
              </Col>
            </div>
          )}
        </Row>

        <Row>
          <Col md={2}>
            {catLoad ? (
              <Loader />
            ) : catError ? (
              <Message variant="danger">{catError}</Message>
            ) : (
              <div style={styles.fadeInLeft}>
                <h2 className="text-center mt-2 font-weight-bold">{contextLang === "en" ? "Filters" : "تصنيف حسب"}</h2>
                <hr />
                <CategoryFilter />
                <hr />
                <PriceFilter min={range[0]} max={range[1]}  />
                <hr />
                <RateFilter />
                <hr />
                <div className="text-center">
                  <Link to="/">
                    <h3 className="btn btn-info">{contextLang === "en" ? "RESET Filter" : "بلا تصنيف"}</h3>
                  </Link>
                </div>
              </div>
            )}
          </Col>

          <Col md={8}>
            <br />
            {!keyword && (
              <h1 style={styles.fadeIn} className="text-center">
                {contextLang === "en" ? "LATEST PRODUCTS" : "أحدث المنتجات"}
              </h1>
            )}
            {keyword && (
              <h1 style={styles.fadeIn}>
                {contextLang === "en" ? "Result" : "نتيجة البحث"}
              </h1>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div>
                {products && (
                  <div>
                    <Row>
                      {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                          <Product product={product} />
                        </Col>
                      ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                  </div>
                )}
                {products.length == 0 && (
                  <div>
                    <Message variant="info">{"No Products Found"}</Message>
                  </div>
                )}
              </div>
            )}
          </Col>

          <Col md={2}>
            <MostOrdered />
          </Col>
        </Row>
      </div>
    </StyleRoot>
    // </Container> */}
  );
}

export default HomeScreen;
