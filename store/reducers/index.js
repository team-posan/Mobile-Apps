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
      console.log("masuuk");
      let filter = state.carts.map((product, index) => {
        console.log(product);
        if (product.ProductId == action.payload.ProductIdEdited) {
          return (state.carts[index].quantity = action.payload.newQuantity);
        } else {
          return (state.carts[index] = product);
        }
      });
      console.log(filter, "filter edit reducer");
    // return { ...state, carts: filter };

    case "ORDER_LIST_AFTER_CHECKOUT":
      console.log("order setelah user checkout");
      return { ...state, orders: action.payload.data };

    case "REMOVE_FROM_CARTS":
      let newStateCarts = [];
      console.log("remove from carts");
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

    default:
      return state;
  }
};

export default reducer;
