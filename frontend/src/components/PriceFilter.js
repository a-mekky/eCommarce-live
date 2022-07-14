import React from "react";
import { Slider, Box } from "@mui/material";
import { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { langContext } from "./LanguageContext";

function PriceFilter({min=0,max=1000}) {
  const { contextLang } = useContext(langContext);
  const storedValue = JSON.parse(localStorage.getItem("price"));
  //   const [value, setValue] = useState([20, 100]);
  // const product =  useSelector((state) => state.productList);
  // const {range} = product





  const [value, setValue] = useState(storedValue ? storedValue : [20,400]);

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  let keyword = searchParam.get("keyword");
  if (!keyword) {
    keyword = "";
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



  const handleChange = (event, newValue) => {
    setValue(newValue);
    let statePrice = [value[0], value[1]];
    localStorage.setItem("price", JSON.stringify(statePrice));
  };
  const handleNavigete = () => {
    let min = value[0];
    let max = value[1];
    navigate(
      `/?keyword=${keyword}&category=${catValue}&minPrice=${min}&maxPrice=${max}&rate=${rate}&page=1`
    );
  };



  const handleChangeMin = (e) => {
    let get_max_value = value[1];
    let newValue = parseInt([e.target.value]);
    if (e.target.value >= 1) {
      console.log(newValue);
      setValue([newValue, get_max_value]);
      let statePrice = [Number(e.target.value), value[1]];
      localStorage.setItem("price", JSON.stringify(statePrice));
      navigate(
        `/?keyword=${keyword}&category=${catValue}&minPrice=${e.target.value}&maxPrice=${get_max_value}&page=1`
      );
    } else {
        if(e.target.value = 0){
            setValue([1,get_max_value])
        }
        console.log("else");
    }
  };
  const handleChangeMax = (e) => {
    let get_min_value = value[0];
    let newValue = parseInt([e.target.value]);
    if (e.target.value >= 1) {
      console.log(newValue);
      setValue([get_min_value, newValue]);
      let statePrice = [value[0], Number(e.target.value)];
      localStorage.setItem("price", JSON.stringify(statePrice));
      navigate(
        `/?keyword=${keyword}&category=${catValue}&minPrice=${get_min_value}&maxPrice=${e.target.value}&page=1`
      );
    } else {
        if(e.target.value = 0){
            setValue([get_min_value,1])
        }
      console.log("else");
    }
  };



  function valuetext(value) {
    return `${value}$`;
  }

  return (
    <div>
      <h2>{contextLang === "en" ? "Price Range" : "السعر"}</h2>
      <Box>
        <Slider
          getAriaLabel={() => "Price"}
          value={value}
            onMouseUp={handleNavigete}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={10}
          max={1000}
        />
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text">{contextLang === "en" ? "Min" : "اقل سعر"}</span>
            <input
              type="text"
              className="form-control"
              placeholder="Min Price"
              aria-label="Min Price"
              value={value[0]}
              onChange={(e) => handleChangeMin(e)}
            />
            <span className="input-group-text">{contextLang === "en" ? "Max" : "اقصي سعر"}</span>
            <input
              type="text"
              className="form-control"
              placeholder="Max Price"
              aria-label="Max Price"
              value={value[1]}
              onChange={handleChangeMax}
            />
          </div>
        </div>
      </Box>
    </div>
  );
}

export default PriceFilter;
