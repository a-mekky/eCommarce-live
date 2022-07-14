import React, { useState, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import { langContext } from "./LanguageContext";

function SearchBox() {
  const { contextLang } = useContext(langContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [searchParam] = useSearchParams();
  let category = searchParam.get("category");
  if (!category) {
    category = "";
  }
  let minPrice = searchParam.get("minPrice");
  if (!minPrice) {
    minPrice = "";
  }
  let maxPrice = searchParam.get("maxPrice");
  if (!maxPrice) {
    maxPrice = "";
  }
  let catValue = searchParam.get("category");
  if (!catValue) {
    catValue = "";
  }
  let rate = searchParam.get("rate");
  if (!rate) {
    rate = "";
  }

  
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      // navigate(`/?keyword=${keyword}&category=${category}&page=1`);
      navigate(`/?keyword=${keyword}&category=${catValue}&minPrice=${minPrice}&maxPrice=${maxPrice}&rate=${rate}&page=1`)
    } else {
      navigate(location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline="true">
      <Row>
        <Col md={8}>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="outline-light" className="p-2">
            {contextLang === "en" ? "Search" : "بحث"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
