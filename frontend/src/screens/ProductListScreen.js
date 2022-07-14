import React, {  useEffect,useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
  listCategory,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { langContext } from "../components/LanguageContext";


function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.search;
  const { contextLang } = useContext(langContext);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch(listCategory());
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/edit/${createdProduct._id}`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>{contextLang === "en" ? "Products" : "المنتجات"}</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> {contextLang === "en" ? "Create Product" : "اضافة منتج"}
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>{contextLang === "en" ? "ID" : "رقم المنتج"}</th>
                <th>{contextLang === "en" ? "Name" : "الاسم"}</th>
                <th>{contextLang === "en" ? "Price" : "السعر"}</th>
                {/* <th>{contextLang === "en" ? "Category" : "الفئة"}</th> */}
                <th>{contextLang === "en" ? "Brand" : "العلامة التجارية"}</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  {/* <td>{categories.filter((q)=>q.id === product.category)[0].title}</td> */}
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/edit/${product._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
