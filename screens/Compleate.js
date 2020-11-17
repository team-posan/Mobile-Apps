import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersCarts,
  doneTrasaction,
} from "../store/actions/storeActions";
// import LottieView from "lottie-react-native";
// arr number id

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

  // let dataqr = filterCart();
  // console.log(dataqr);

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        {/* <Text> carts : {JSON.stringify(orders.carts)}</Text> */}
        <Text style={styles.text}>Thanks for your order</Text>
      </View>

      {orders ? <QRCode content={filterCart()} size={200} /> : null}

      <Text>{qrData}</Text>
      <TouchableOpacity style={styles.rightBottomBar} onPress={goToHomePage}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Close
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    width: 250,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "#1E2749",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "white",
  },
  inputBox: {
    width: 400,
    height: 300,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
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
    top: -150,
    width: 250,
    height: 250,
  },
});
