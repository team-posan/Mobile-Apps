const initialState = {
  dataStore: [],
  dataProducts: [],
  carts: [],
  access: [],
  orders: [],
  paymentBills: 0,
  amount: 0,
  codeVerify: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_USER_LOGIN":
      console.log(">>> new user login with verification <<<");
      console.log(action.payload.access_token, "payload.access");
      console.log(action.payload.codeVerification, "payload.code verify");
      return {
        ...state,
        access: action.payload.access_token,
        codeVerify: action.payload.codeVerification,
      };

    case "USER_LOGIN":
      console.log(">>> user login <<<");
      console.log(action.payload.access_token, "payload.access");
      return { ...state, access: action.payload.access_token };

    case "FETCH_STORE_DATA":
      return { ...state, dataStore: action.payload.store };

    case "FETCH_PRODUCTS_DATA":
      return { ...state, dataProducts: action.payload.products };

    case "ADD_TO_CARTS":
      let newCarts = state.carts.concat(action.payload.productsAdd);
      return { ...state, carts: newCarts };

    case "EDIT_CARTS_QTY":
      console.log(">>>>>> masuuk edit carts qty <<<<<<");
      let filter = state.orders.map((product, index) => {
        if (product.ProductId == action.payload.ProductIdEdited) {
          return (state.orders[index].quantity = action.payload.newQuantity);
        } else {
          return (state.orders[index] = product);
        }
      });
      // let filterCarts = state.carts.map((product, index) => {
      //   if (product.ProductId == action.payload.ProductIdEdited) {
      //     return (state.carts[index].quantity = action.payload.newQuantity);
      //   } else {
      //     return (state.carts[index] = product);
      //   }
      // });
      // console.log(filter, "filter edit reducer");
      return { ...state, orders: filter };

    case "CHECKOUT_TO_PAYMENT_ACTION":
      return { ...state, orders: action.payload };

    case "REMOVE_FROM_CARTS":
      let newStateCarts = [];
      let filterData = state.carts.map((product) => {
        if (product.ProductId !== action.payload.ProductId) {
          newStateCarts.push(product);
        } else {
          console.log("ada");
        }
        // console.log(newStateCarts, "data baru");
      });
      return { ...state, carts: newStateCarts };
      break;

    case "PAYMENT_BILLS":
      return {
        ...state,
        paymentBills: action.payload.bills,
        amount: action.payload.amount,
      };

    case "DONE_TRANSACTIONS":
      return { ...state, carts: [], orders: [] };

    case "CLEAR_ALL_CARTS_ORDER":
      return { ...state, carts: [], orders: [] };

    default:
      return state;
  }
};

export default reducer;
