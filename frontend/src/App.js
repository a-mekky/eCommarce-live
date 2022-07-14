import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

import { useState } from "react";
import { langContext } from "./components/LanguageContext";

function App() {
  const [contextLang, setContextLang] = useState("en");
  return (
    <>
      <langContext.Provider value={{ contextLang, setContextLang }}>
        <div
          className={contextLang === "ar" ? "text-end" : "text-start"}
          dir={contextLang === "ar" ? "rtl" : "ltr"}
        >
          <Header />
          <main className="py-3">
            <Container fluid>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart">
                  <Route path=":productId" element={<CartScreen />} />
                  <Route path="" element={<CartScreen />} />
                </Route>

                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route
                  path="/admin/user/edit/:id"
                  element={<UserEditScreen />}
                />
                <Route
                  path="/admin/productlist"
                  element={<ProductListScreen />}
                />
                <Route
                  path="/admin/product/edit/:id"
                  element={<ProductEditScreen />}
                />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
              </Routes>
            </Container>
          </main>
        </div>
        <Footer />
      </langContext.Provider>
    </>
  );
}

export default App;
