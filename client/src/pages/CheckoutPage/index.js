import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Checkout from '../../components/Checkout'
import PaymentContext from '../../contexts/Payment/PaymentContext'

const CheckoutPage = () => {
  const history=useHistory()
  const {paymentState}=useContext(PaymentContext)

  useEffect(() => {
if(!paymentState)history.push('/')
  }, [])
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center', height:'calc(100vh - 31.32px - 58.23px)',flexDirection:'column'}}>
      <h3 className="text-light">Pay {paymentState.amount}$</h3>
      <Checkout/>
    </div>

  )
}

export default CheckoutPage
