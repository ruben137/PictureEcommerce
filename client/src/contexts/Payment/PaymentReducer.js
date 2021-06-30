import {SET_PAYMENT_STATE} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PAYMENT_STATE:
      return {
        ...state,
        paymentState: payload,
      };

    default:
      return state;
  }
};
