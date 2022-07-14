import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { langContext } from "../components/LanguageContext";
import { listCategory } from "../actions/productActions";

function ProductEditScreen() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const { contextLang } = useContext(langContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    dispatch(listCategory());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist">
        {contextLang === "en" ? "Go Back" : "العودة"}
      </Link>

      <FormContainer>
        <h1>{contextLang === "en" ? "Edit Product" : "تعديل المنتج"}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>{contextLang === "en" ? "Name" : "الاسم"}</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>
                {contextLang === "en" ? "Price" : "السعر"}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>
                {contextLang === "en" ? "Iamge" : "صورة المنتج"}
              </Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className='my-2'
              ></Form.Control> */}

              <Form.Control
                type="file"
                controlid="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>
                {contextLang === "en" ? "Brand" : "العلامة التجارية"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>
                {contextLang === "en" ? "Stock" : "المخزون"}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Label>
              {contextLang === "en" ? "Category" : "الفئة"}
            </Form.Label>
            <Form.Select
              as="select"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
            >
              {categories.map((category) => (
                <>
                  {category.id !== 5 && (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  )}
                </>
              ))}
            </Form.Select>

            <Form.Group controlId="description">
              <Form.Label>
                {contextLang === "en" ? "Description" : "الوصف"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              {contextLang === "en" ? "Update" : "تحديث"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
