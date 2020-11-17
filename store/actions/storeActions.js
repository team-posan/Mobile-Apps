export const FETCH_STORE_DATA = "FETCH_STORE_DATA";
export const FETCH_PRODUCTS_DATA = "FETCH_PRODUCTS_DATA";
export const ADD_TO_CARTS = "ADD_TO_CARTS";
import JWT from "expo-jwt";
import { Linking, Platform } from "react-native";
const scrt = 'POSAN'

export const baseUrl =
  Platform.OS === "android" ? "125.161.139.121:5000/" : "125.161.139.121:5000/";

export const loginCustomer = (phoneNumber) => {
  return (dispatch) => {
    let phone_number = phoneNumber.toString();
    fetch(`http://10.0.2.2:5000/user/customerlogin`, {
      method: "POST",
      body: JSON.stringify({ phone_number }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((access_token) => {
        dispatch({
          type: "USER_LOGIN",
          payload: { access_token },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const paymentServices = (idToPay, amount) => {
  console.log(idToPay, amount, 'paymentServices top')

  const payCode = JWT.encode({
    amount: amount,
    data_id: idToPay
  }, scrt)
  console.log(payCode, 'paymentServices bottom')
  return (dispatch) => {
    fetch(`http://10.0.2.2:5000/midtrans?pay=${payCode}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log('dari payementServices', data)
        dispatch({
          type: 'SET_STATUS_PAYMENT',
          payload: data.statusUrl
        })
        Linking.openURL(data.deeplinkUrl)
        
      })
      .catch((err) => console.log(err));
  }
}

export const fetchStore = () => {
  console.log(Platform.OS);
  return (dispatch) => {
    fetch(`http://10.0.2.2:5000/store`)
      .then((res) => res.json())
      .then((store) => {
        dispatch({
          type: FETCH_STORE_DATA,
          payload: { store },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchProducts = (storeId, access) => {
  return (dispatch) => {
    fetch(`http://10.0.2.2:5000/product?store=${storeId}`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        access: access.access,
      },
    })
      .then((res) => res.json())
      .then((products) => {
        // console.log(products);
        dispatch({
          type: FETCH_PRODUCTS_DATA,
          payload: { products },
        });
      })
      .catch((err) => console.log(err, "error while fetch data products"));
  };
};

export const addToCarts = (productsAdd) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CARTS,
      payload: { productsAdd },
    });
    console.log(`success added ${productsAdd}  to carts`);
  };
};

export const editCartBeforeCheckout = (newQuantity, ProductIdEdited) => {
  return (dispatch, getState) => {
    console.log("masuk edit cart actions");
    let isExist = getState().carts.filter(
      (product) => product.ProductId === ProductIdEdited
    );
    dispatch({
      type: "EDIT_CARTS_QTY",
      payload: { newQuantity, ProductIdEdited },
    });
    // console.log("masuk edit carts", newQuantity, ProductIdEdited);
  };
};

// cara dapet params >>>> edit setelah checkout
export const editCartQty = (ProductId, access) => {
  return (dispatch) => {
    fetch(`http://10.0.2.2:5000/carts/317`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access: access.access,
      },
      body: JSON.stringify({ ProductId: ProductId, quantity: 10 }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, "success edit data");
      })
      .catch((err) => console.log(err, "error while edit data"));
  };
};

export const filterProduct = (ProductId) => {
  return (dispatch, getState) => {
    console.log(ProductId, "<<< untuk difilter");
    let isExist = getState().carts.filter(
      (product) => product.ProductId === ProductId
    );
    if (isExist.length > 0) {
      return true;
    } else {
      console.log("belum ada boleh masuk carts");
      return false;
    }
  };
};

export const checkout = (carts, access) => {
  return (dispatch) => {
    console.log("masuk action checkout action,", carts);
    fetch(`http://10.0.2.2:5000/carts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access: access.access,
      },
      body: JSON.stringify({ carts }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("success added to database", data);
        dispatch({
          type: "CHECKOUT_TO_PAYMENT_ACTION",
          payload: data
        })
      })
      .catch((err) => console.log(err));
  };
};

// export const fetchOrdersCarts = (access) => {
//   return (dispatch) => {
//     console.log("masuk fetch carts");
//     fetch(`http://10.0.2.2:5000/carts`, {
//       method: "GET",
//       headers: {
//         // "Content-Type": "application/json",
//         access: access.access,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch({
//           type: "ORDER_LIST_AFTER_CHECKOUT",
//           payload: { data },
//         });
//       })
//       .catch((err) => console.log(err, "error while fetch cart order"));
//   };
// };

export const removeCartById = (ProductId) => {
  console.log("masuk delete from carts", ProductId);
  return (dispatch) => {
    dispatch({
      type: "REMOVE_FROM_CARTS",
      payload: { ProductId },
    });
  };
};

//bulk daelete all carts
export const removeAllCarts = (ProductId, access) => {
  return (dispatch) => {
    fetch(`http://10.0.2.2:5000/carts`, {
      method: "DELETE",
      headers: {
        access: access.access,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("success remove form carts", data);
      })
      .catch((err) => console.log(err, "err while remove data form carts"));
  };
};

export const paymentBills = (bills, amount) => {
  return (dispatch) => {
    dispatch({
      type: "PAYMENT_BILLS",
      payload: { bills, amount },
    });
  };
};

export const doneTrasaction = () => {
  return (dispatch) => {
    console.log("masuk done transaction");
    dispatch({
      type: "DONE_TRANSACTIONS",
    });
  };
};
