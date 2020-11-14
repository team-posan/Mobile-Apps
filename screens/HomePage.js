import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Text } from "react-native-elements";

// import LottieView from "lottie-react-native";

export default function HomePage(props) {
  const { phoneNumber } = props.route.params;
  console.log(phoneNumber);

  const [storeId, setStoreId] = useState(1);

  function goToStore() {
    console.log("navigate to product", storeId);
    props.navigation.navigate("Store", {
      storeId: storeId,
    });
  }

  const dummy = [
    {
      id: 1,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 6,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 7,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={{ color: "white" }}>
          Hai, User
        </Text>
        <Text h5 style={{ fontWeight: "bold", color: "white" }}>
          {phoneNumber}
        </Text>
      </View>
      <View style={styles.productsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text h5 style={{ fontWeight: "bold" }}>
            Pilih Toko Terdekat
          </Text>
          <View>
            {dummy.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={item.id}
                  onPress={goToStore}
                >
                  <Image
                    onPress={goToStore}
                    style={styles.image}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                  />

                  <View style={styles.innerTextCards}>
                    <Text h4>CoffeShop</Text>
                    <Text>Outlet Address Street, Jakarta Selatan</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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

const styles = StyleSheet.create({
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
    height: 580,
    backgroundColor: "#C4C4C4",
    padding: 30,
  },

  card: {
    width: 330,
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 0,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginLeft: -5,
  },
  innerTextCards: {
    width: 200,
    height: 100,
    marginLeft: 20,
    padding: 10,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  menuNav: {
    width: 400,
    height: 50,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
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
});
