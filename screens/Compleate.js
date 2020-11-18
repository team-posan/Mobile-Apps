import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Text } from "react-native-elements";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersCarts,
  doneTrasaction,
} from "../store/actions/storeActions";

// import LottieView from "lottie-react-native";
// arr number id

const image = {
  uri:
    "https://i.pinimg.com/originals/93/5f/08/935f08751b4d27004201a9d6bee95f0b.jpg",
};

export default function Compleate(props) {
  const dispatch = useDispatch();
  const { orders, access } = useSelector((state) => state);
  const [qrData, setQrData] = useState();

  // useEffect(() => {
  //   dispatch(fetchOrdersCarts(access));
  // }, []);

  function goToHomePage() {
    dispatch(doneTrasaction());
    props.navigation.navigate("HomePage");
  }

  const filterCart = () => {
    let dataId;
    if (orders) {
      dataId = orders.map((val) => {
        return val.id;
      });
    }
    // console.log(orders, "ini yang dicari");
    return JSON.stringify(dataId);
  };

  return (
    <ImageBackground source={image} style={background.image}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.textHeader}>Thank you for the orders</Text>
        </View>

        <View style={styles.barcode}>
          {orders ? <QRCode content={filterCart()} size={220} /> : null}
          {orders ? <Text style={{ marginTop: 10 }}>Order Data : </Text> : null}
        </View>

        <Text style={styles.text}>
          please give this QR Code to the cashier to check your transaction
        </Text>
        <TouchableOpacity style={styles.rightBottomBar} onPress={goToHomePage}>
          <View style={styles.checkoutBtn}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },

  textHeader: {
    width: 200,
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 30,
    color: "white",
    // backgroundColor: "red",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: "black",
  },
  text: {
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  box: {
    top: 30,
    width: 400,
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  checkoutBtn: {
    width: 200,
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
  barcode: {
    width: 250,
    height: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

const background = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});
