import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./pages/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsState from "./contexts/Products/ProductsState";
import { CartState } from "./contexts/Cart/CartState";
import { AuthState } from "./contexts/Auth/AuthState";
import PaymentState from "./contexts/Payment/PaymentState";
import AdminPage from "./pages/Admin";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
// hoc
import WithAdminAuth from "./hoc/withAdminAuth";
import WithAuth from "./hoc/withAuth";
import CheckoutPage from "./pages/CheckoutPage";
import PurchasesPage from "./pages/PurchasesPage";
import NotFound from "./pages/NotFound";
import SecretPage from "./pages/SecretPage";

function App() {
  return (
    <AuthState>
      <ProductsState>
        <CartState>
          <PaymentState>
            <BrowserRouter basename="/PicCommerce">
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route path="/products">
                  <ProductsPage />
                </Route>
                <Route path="/product/:productID">
                  <ProductPage />
                </Route>
                <Route
                  path="/admin"
                  render={() => (
                    <WithAdminAuth>
                      <AdminPage />
                    </WithAdminAuth>
                  )}
                ></Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route path="/login">
                  <AuthPage />
                </Route>
                <Route
                  path="/checkout"
                  render={() => (
                    <WithAuth>
                      <CheckoutPage />
                    </WithAuth>
                  )}
                />
                <Route
                  path="/purchases"
                  render={() => (
                    <WithAuth>
                      <PurchasesPage />
                    </WithAuth>
                  )}
                />
                <Route
                  exact
                  path="/secretpath"
                  render={() => (
                    <WithAdminAuth>
                      <SecretPage />
                    </WithAdminAuth>
                  )}
                />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </PaymentState>
        </CartState>
      </ProductsState>
    </AuthState>
  );
}

export default App;
