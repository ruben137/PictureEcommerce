import React, { useReducer } from "react";
import { SET_PAYMENT_STATE } from "../types";
import PaymentContext from "./PaymentContext";
import PaymentReducer from "./PaymentReducer";

const PaymentState = (props) => {
  const initialState = {
    paymentState:{
      amount:null,
      description:null
    }
  };


  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const setPaymentState = (data) => {
    try {
      dispatch({ type: SET_PAYMENT_STATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
   paymentState:state.paymentState,
   setPaymentState
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState ;
