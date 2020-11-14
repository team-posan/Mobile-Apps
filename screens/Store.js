import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Text } from "react-native-elements";

// import LottieView from "lottie-react-native";

export default function Store(props) {
  const { storeId } = props.route.params;
  console.log(storeId);

  function goToStore() {
    console.log("navigate to product", storeId);
    props.navigation.navigate("HomePage");
  }

  function goToCheckout() {
    console.log("navigate to checkout page");
    props.navigation.navigate("Order");
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

  const data = [
    { id: "a", value: "A" },
    { id: "b", value: "B" },
    { id: "c", value: "C" },
    { id: "d", value: "D" },
    { id: "e", value: "E" },
    { id: "f", value: "F" },
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
            data={dummy}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id} onPress={goToStore}>
                <View style={styles.card}>
                  <Image
                    onPress={goToStore}
                    style={styles.image}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                  />
                  <View style={styles.productTextCard}>
                    <View style={styles.innerTextCards}>
                      <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        Rp. 18.000
                      </Text>
                    </View>
                    <View style={styles.quantityProduct}>
                      <Text style={{ fontWeight: "bold" }}>3</Text>
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
          <Text style={{ fontSize: 10, color: "white" }}>2 Items</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            42.000,-
          </Text>
        </View>
        <TouchableOpacity style={styles.rightBottomBar} onPress={goToCheckout}>
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
