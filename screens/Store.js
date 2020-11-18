import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Button } from '@ui-kitten/components';
import { Text } from "react-native-elements";
import {
  fetchProducts,
  addToCarts,
  filterProduct,
  clearAll,
} from "../store/actions/storeActions";

const width = Dimensions.get('screen').width

export default function Store(props) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);

  const { dataProducts, carts } = useSelector((state) => state);
  const { access } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProducts(storeId, access));
    dispatch(clearAll());
    setTotal(0);
    setItemQuantity(0);
  }, []);

  const { storeId, storeName } = props.route.params;
  console.log(storeId);

  function goToCheckout() {
    console.log("navigate to checkout page");
    props.navigation.navigate("Order", {
      itemQuantity: itemQuantity,
      total: total,
    });
  }

  function cartHandler(product) {
    let checkOnCarts = dispatch(filterProduct(product.ProductId));
    console.log(checkOnCarts);
    if (!checkOnCarts) {
      setTotal(total + product.price);
      setItemQuantity(itemQuantity + 1);
      const { ProductId, quantity, payment_status } = product;
      dispatch(addToCarts(product, access));
    } else {
      console.log("ini tambahin qty ");
      // dispatch(editCartQty(product.ProductId, access));
    }
  }

  function checkoutCarts() {
    if (carts.length > 0) {
      // dispatch(checkout(carts, access));
      // console.log("masuk");
      goToCheckout();
      setTotal(0);
      setItemQuantity(0);
    } else {
      console.log("cart empty");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={{ color: "white" }}>
        Pilih Product
        </Text>
      </View>

      <View style={styles.productsContainer}>
        {/* <Text h5 style={{ fontWeight: "bold" }}>
          Pilih Product
        </Text> */}
        <View style={{
          width: 'auto'
        }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataProducts}
            renderItem={({ item }, index) => (
              <TouchableOpacity
                      style={styles.card}
                      key={index}
                      onPress={() =>
                        cartHandler({
                          ProductId: item.id,
                          quantity: 1,
                          payment_status: "unpaid",
                          price: item.price,
                          Product: item,
                        })
                      }
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: item.image_url }}
                      />
                      <View style={styles.innerTextCards}>
                        <Text h4 style={{ fontWeight: "bold" }}>
                          {item.product_name}
                        </Text>
                        <Text>Rp.{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-</Text>
                        <Text>Stock {item.stock}</Text>
                      </View>
                    </TouchableOpacity>
              // <TouchableOpacity
              //   key={item.id}
              //   onPress={() =>
              //     cartHandler({
              //       ProductId: item.id,
              //       quantity: 1,
              //       payment_status: "unpaid",
              //       price: item.price,
              //       Product: item,
              //     })
              //   }
              // >
              //   <View style={[styles.card]}>
              //     <Image
              //       style={styles.image}
              //       source={{ uri: item.image_url }}
              //     />

              //     <View style={styles.productTextCard}>
              //       <View style={styles.innerTextCards}>
              //         <Text style={{ fontWeight: "bold" }}>
              //           {item.product_name}
              //         </Text>
              //         <Text style={{ fontWeight: "bold", fontSize: 10 }}>
              //           Rp. {item.price}
              //         </Text>
              //       </View>
              //       <View style={styles.quantityProduct}>
              //         <Text style={{ fontWeight: "bold" }}>Stock: {item.stock}</Text>
              //       </View>
              //     </View>
              //   </View>
              // </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
          />
        </View>
      </View>
      {
        itemQuantity !== 0 
        ? <View style={styles.bottomTotalBar}>
        <View style={styles.leftBottomBar}>
          <Text style={{ fontSize: 10, color: "white" }}>
            {itemQuantity} Items
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-
          </Text>
        </View>
        <TouchableOpacity style={styles.rightBottomBar} onPress={checkoutCarts}>
          <View style={styles.checkoutBtn}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
              Checkout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      : <View style={[styles.bottomTotalBar, {
        backgroundColor: 'transparent'
      }]}></View>
      }
      {/* <View style={styles.menuNav}>
        <View style={styles.left}>
          <Text>Discover</Text>
        </View>
        <View style={styles.right}>
          <Text>History</Text>
        </View>
      </View> */}
    </View>
  );
}
const numColumns = 1;
let size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    // flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  container: {
    marginTop:41,
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "space-around",
  },
  header: {
    height: 120,
    backgroundColor: "#1E2749",
    // borderBottomRightRadius: 50,
    borderColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    paddingVertical: 46,
    paddingHorizontal: 30,
    marginBottom:10
    // marginTop: -10,
  },
  productsContainer: {
    // left: -10,
    // padding: 20,
    height: '70%',
    // backgroundColor: "#C4C4C4",
    // display: "flex",
    alignItems: "center",
    justifyContent: 'center'
  },

  card: {
    // width: '80%',
    // height: 80,
    backgroundColor: "#fff",
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#EFEFEF",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // left: 10,
    margin: 10


    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,

    // elevation: 14,
  },
  productTextCard: {
    // width: 150,
    // backgroundColor: "black",
    marginTop: 5,
    marginLeft: 10,
    // display: "flex",
    flexDirection: "row",
  },
  innerTextCards: {
    width: 220,
    height: 100,
    padding: 10,
    top: 5,
    left: 15,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  quantityProduct: {
    width: 60,
    height: 50,
    // backgroundColor: "red",
    alignItems: "flex-end",
  },
  menuNav: {
    // width: 400,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  left: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTotalBar: {
    // width: 400,
    height: 60,
    backgroundColor: "#E14C17",
    padding: 10,
    paddingLeft: 20,
    // alignSelf: 'flex-end',
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftBottomBar: {
    width: 180,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    display: "flex",
    flexDirection: "column",
  },
  rightBottomBar: {
    width: 150,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    right: 10,
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  checkoutBtn: {
    width: 130,
    height: 38,
    backgroundColor: "#1E2749",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 18,
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
