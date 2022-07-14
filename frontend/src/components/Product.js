import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { langContext } from "../components/LanguageContext";

import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";

function Product({ product }) {
  const styles = {
    fadeInUp: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
    },
  };
  const { contextLang } = useContext(langContext);

  return (
    <div >
      <StyleRoot>
        <div style={[styles.fadeInUp]} >
          <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
              <Card.Img src={product.image} style={{ maxHeight: "15em" }} />
            </Link>
            <Card.Body>
              <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                  <strong className="text-justify">{product.name}</strong>
                </Card.Title>
              </Link>
              <Card.Text as="div">
                <div className="my-3">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${
                      contextLang === "en" ? "Reviews" : "مراجعة"
                    }`}
                    color={"#f8e825"}
                  />
                </div>
              </Card.Text>
              <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </StyleRoot>
    </div>
  );
}

export default Product;
