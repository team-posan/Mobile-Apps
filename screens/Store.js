import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import { Text } from "react-native-elements";
import {
  fetchProducts,
  addToCarts,
  checkout,
  filterProduct,
  editCartQty,
} from "../store/actions/storeActions";

export default function Store(props) {
  const [total, setTotal] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);

  const dispatch = useDispatch();
  const { dataProducts, carts } = useSelector((state) => state);
  const { access } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProducts(storeId, access));
    setTotal(0);
    setItemQuantity(0);
  }, []);

  const { storeId } = props.route.params;
  console.log(storeId);

  function goToCheckout() {
    console.log("navigate to checkout page");
    props.navigation.navigate("Order", {
      itemQuantity: itemQuantity,
      total: total
    });
  }

  function cartHandler(product) {
    setTotal(total + product.price);
    setItemQuantity(itemQuantity + 1);
    let checkOnCarts = dispatch(filterProduct(product.ProductId));
    console.log(checkOnCarts);
    if (!checkOnCarts) {
      const { ProductId, quantity, payment_status } = product;
      dispatch(addToCarts(product));
    } else {
      console.log("ini tambahin qty ");
      dispatch(editCartQty(product.ProductId, access));
    }
  }

  function checkoutCarts() {
    if (carts.length > 0) {
      dispatch(checkout(carts, access));
      goToCheckout();
    } else {
      console.log("cart empty");
    }
  }

  const dummy = [
    {
      id: 1,
      title: "Kopi",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      title: "Teh",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 6,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 7,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 8,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 9,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 10,
      title: "Roko",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={{ color: "white" }}>
          Pilih Product
        </Text>
        <Text h5 style={{ fontWeight: "bold", color: "white" }}>
          Store {storeId}
        </Text>
      </View>

      <View style={styles.productsContainer}>
        <Text h5 style={{ fontWeight: "bold" }}>
          Pilih Product
        </Text>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataProducts}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  cartHandler({
                    ProductId: item.id,
                    quantity: item.stock,
                    payment_status: "unpaid",
                    price: item.price,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_url }}
                  />

                  <View style={styles.productTextCard}>
                    <View style={styles.innerTextCards}>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.product_name}
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        Rp. {item.price}
                      </Text>
                    </View>
                    <View style={styles.quantityProduct}>
                      <Text style={{ fontWeight: "bold" }}>{item.stock}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
          />
        </View>
      </View>
      <View style={styles.bottomTotalBar}>
        <View style={styles.leftBottomBar}>
          <Text style={{ fontSize: 10, color: "white" }}>
            {itemQuantity} Items
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {total.toLocaleString("en-US")},-
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
      <View style={styles.menuNav}>
        <View style={styles.left}>
          <Text>Discover</Text>
        </View>
        <View style={styles.right}>
          <Text>History</Text>
        </View>
      </View>
    </View>
  );
}
const numColumns = 2;
let size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  container: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    justifyContent: "space-around",
  },
  header: {
    height: 150,
    backgroundColor: "#1E2749",
    borderBottomRightRadius: 50,
    borderColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    padding: 30,
    marginTop: -10,
  },
  productsContainer: {
    left: -10,
    padding: 20,
    height: 520,
    backgroundColor: "#C4C4C4",
    display: "flex",
    alignItems: "center",
  },

  card: {
    width: 150,
    height: 180,
    marginLeft: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productTextCard: {
    width: 150,
    // backgroundColor: "black",
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
  },
  innerTextCards: {
    width: 90,
    height: 50,
    justifyContent: "flex-start",
    // backgroundColor: "blue",
    fontSize: 10,
  },
  quantityProduct: {
    width: 60,
    height: 50,
    // backgroundColor: "red",
    alignItems: "flex-end",
  },
  menuNav: {
    width: 400,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    width: 400,
    height: 60,
    backgroundColor: "#E14C17",
    padding: 10,
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
