import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Form } from "react-bootstrap";
import {
  useNavigate,
  // useLocation
  useSearchParams,
} from "react-router-dom";

import { langContext } from "./LanguageContext";

function CategoryFilter() {
  //   const [keyword, setKeyword] = useState("");
  const [searchParam] = useSearchParams();
  let keyword = searchParam.get("keyword");
  if (!keyword) {
    keyword = "";
  }
  let minPrice = searchParam.get("minPrice");
  if (!minPrice) {
    minPrice = 0;
  }
  let maxPrice = searchParam.get("maxPrice");
  if (!maxPrice) {
    maxPrice = 10000;
  }
  let catValue = searchParam.get("category");
  if (!catValue) {
    catValue = "";
  }
  let rate = searchParam.get("rate");
  if (!rate) {
    rate = "";
  }

  const [categoryFilter, setCategoryFilter] = useState("");
  const { contextLang } = useContext(langContext);

  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { category } = productList;

  const handelChange = (e) => {
    setCategoryFilter(e.target.id);
    navigate(
      `/?keyword=${keyword}&category=${e.target.id}&minPrice=${minPrice}&maxPrice=${maxPrice}&rate=${rate}&page=1`
    );
  };

  return (
    <>
      <h2 className="mt-3">{contextLang === "en" ? "Category" : "الفئة"}</h2>
      <div>
        {category.map((category) => (
          <div key={category.id}>
            {category.id === 5 ? (
              <></>
            ) : (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={category.title}
                  onChange={(e) => handelChange(e)}
                  defaultChecked={catValue === category.title}
                />
                <label className="form-check-label">{category.title}</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryFilter;
