import React, { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import ChangeLanguage from "./ChangeLang";
import { langContext } from "./LanguageContext";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart.cartItems.length);

  const { contextLang } = useContext(langContext);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>E-Commerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {userInfo && !userInfo.isAdmin && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>{" "}
                    {contextLang === "en" ? "Cart" : "السلة"}
                    {cart !== 0 && (
                      <Badge bg="none" style={{ fontSize: 14 }}>
                        {cart}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      {contextLang === "en" ? "Prfile" : "الصفحة الشخصية"}
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    {contextLang === "en" ? "Logout" : "تسجيل الخروج"}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    {contextLang === "en" ? "Login" : "تسجيل الدخول"}
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      {contextLang === "en" ? "Users" : "المستخدمين"}
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      {contextLang === "en" ? "Products" : "المنتجات"}
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      {contextLang === "en" ? "Orders" : "الطلبيات"}
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <div className="ms-2">
            <ChangeLanguage />
          </div>
          <div className="ms-2">
            <SearchBox />
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
