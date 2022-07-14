import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

function ProductCarousel() {
  const styles = {
    fadeIn: {
      animation: "x 1.5s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    }
  };
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;


  

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <StyleRoot>
    <div style={styles.fadeIn}>
      
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name}  fluid/>
                <Carousel.Caption className="carousel.caption">
                  <h4>
                    {product.name}
                  </h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      
    </div>
    </StyleRoot>
  );
}

export default ProductCarousel;
