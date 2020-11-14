import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { Text } from "react-native-elements";

// import LottieView from "lottie-react-native";

export default function FirstPage(props) {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  function goToHomePage() {
    props.navigation.navigate("HomePage", {
      phoneNumber: phoneNumber,
    });
  }

  return (
    <View style={styles.container}>
      <Text>{phoneNumber}</Text>
      <View style={styles.inputBox}>
        {/* <LottieView
          source={require("../assets/lf20_pMCvhM.json")}
          loop={true}
          autoPlay={true}
          progress={0}
          style={{ width: 200, height: 200, justifyContent: "center" }}
        /> */}
        <Text style={styles.text}>Sebelum belanja masukin nomor handphone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          onChangeText={(e) => setPhoneNumber(e)}
          placeholder="phone number"
        />
      </View>

      <Button
        style={{ width: 200 }}
        color="#E14C17"
        title="Mulai Belanja"
        onPress={goToHomePage}
      />
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
});
