import React from 'react'
import Cart from '../../components/Cart'
import CheckoutButton from '../../components/CheckoutButton'
import "./styles.css"


const CartPage = () => {

  return (
    <>
     <h2 className="text-light m-2 p-2">Shopping cart</h2>
    <div className="cart-container" style={{display:'flex',width:'100%'}}>
      <Cart/>
      <CheckoutButton/>
    </div>
    </>

  )
}

export default CartPage
