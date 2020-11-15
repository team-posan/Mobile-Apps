const initialState = {
  dataStore: [],
  dataProducts: [],
  carts: [],
  access: [],
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      console.log("user login case reducer");
      console.log(action.payload.access_token);
      return { ...state, access: action.payload.access_token };

    case "FETCH_STORE_DATA":
      // console.log("fetch data store");
      return { ...state, dataStore: action.payload.store };

    case "FETCH_PRODUCTS_DATA":
      // console.log("fetch product data");
      return { ...state, dataProducts: action.payload.products };

    case "ADD_TO_CARTS":
      // console.log("add to cart reducer");
      let newCarts = state.carts.concat(action.payload.productsAdd);
      return { ...state, carts: newCarts };

    case "EDIT_CARTS_QTY":
      console.log("edit cart qty reducer");

    case "ORDER_LIST_AFTER_CHECKOUT":
      console.log("order setelah user checkout");
      return { ...state, orders: action.payload.data };
    default:
      return state;
  }
};

export default reducer;
