import React, { useContext } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Loader from "./Loader";
import Message from "./Message";
import { langContext } from "../components/LanguageContext";

import { fadeInUp,fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

function MostOrdered() {
  const productMostOrdered = useSelector((state) => state.productMostOrdered);
  const { error, loading, products } = productMostOrdered;
  const { contextLang } = useContext(langContext);

  const styles = {
    fadeInUp: {
      animation: "x 1.5s",
      animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
    },
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <StyleRoot>
            <h2 style={[{ textAlign: "center" },styles.fadeIn]}>
        {contextLang === "en"
          ? "Most Orderd Products"
          : " اكثر المنتجات مبيعاً "}
      </h2>
    <div  style={styles.fadeInUp}>

      {products.map((product) => (
        <Card key={product._id} className="my-2">
          <Link to={`/product/${product._id}`}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
            </Card.Body>
          </Link>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {contextLang === "en" ? "Price" : " السعر "}: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              {contextLang === "en" ? "Rate" : " التقيم "}:{" "}
              <Rating value={product.rating} color={"#f8e825"} />
            </ListGroupItem>
          </ListGroup>
        </Card>
      ))}
      
    </div>
    </StyleRoot>
  );
}

export default MostOrdered;
