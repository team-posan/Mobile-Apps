import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { Text } from "react-native-elements";
import { loginCustomer } from "../store/actions/storeActions";

// import LottieView from "lottie-react-native";

export default function FirstPage(props) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const { access } = useSelector((state) => state);

  function goToHomePage() {
    props.navigation.navigate("HomePage", {
      phoneNumber: phoneNumber,
    });
  }

  function login() {
    if (!phoneNumber) {
      console.log("cant login please input correct phone number");
    } else {
      dispatch(loginCustomer(phoneNumber));
      if (access) {
        console.log("success login");
        goToHomePage();
      } else {
        console.log("login failed");
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Sebelum belanja masukin nomor handphone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          onChangeText={(e) => setPhoneNumber(e)}
          placeholder="phone number"
          maxLength={13}
          minLength={11}
        />
      </View>

      <Button
        style={{ width: 200 }}
        color="#E14C17"
        title="Mulai Belanja"
        onPress={login}
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
