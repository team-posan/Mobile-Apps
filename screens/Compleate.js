import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";

// import LottieView from "lottie-react-native";

export default function Compleate(props) {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  function goToHomePage() {
    props.navigation.navigate("HomePage");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Thanks for your order</Text>
      </View>

      <Image
        style={styles.barcode}
        source={{
          uri: "https://arifdiyanto.files.wordpress.com/2015/11/qrcodeuk.gif",
        }}
      />

      <Text>order ID : 132134</Text>

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
