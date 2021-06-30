import React, { useContext, useEffect } from "react";
import cart from "../../assets/cart.png";

import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import CartContext from "../../contexts/Cart/CartContext";
import AuthContext from "../../contexts/Auth/AuthContext";

const Navigation = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { cartProducts, getCartItems, removeItemsFromStorage, cleanCartState } =
    useContext(CartContext);
  const { logout, authData } = useContext(AuthContext);

  useEffect(() => {
    getCartItems(user?.result?.userName);
    if (authData) removeItemsFromStorage();
    return ()=>cleanCartState()
  }, [authData]);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand
        onClick={() => history.push("/")}
         id="title"
        style={{ cursor: "pointer"}}
      >
    <span style={{color:"#00a8ff"}}>Pic</span>Commerce
   
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>

          <NavDropdown title="Account" id="basic-nav-dropdown">
            {!user && (
              <NavDropdown.Item onClick={() => history.push("/login")}>
                Signin
              </NavDropdown.Item>
            )}
            {user && (
              <NavDropdown.Item onClick={() => history.push("/purchases")} >
                Your purchases
              </NavDropdown.Item>
            )}

            {user && (
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => history.push("/cart")}
            className="d-flex align-items-end"
          >
            Your cart({cartProducts.length})
            <span>
              <img
                className="align-end ml-1"
                style={{ width: 25 }}
                src={cart}
                alt=""
              />
            </span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
