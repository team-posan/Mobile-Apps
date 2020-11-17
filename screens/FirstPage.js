import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Text } from "react-native-elements";
import { loginCustomer } from "../store/actions/storeActions";
import { text, inputText, button } from "../styles/index";


export default function FirstPage(props) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const { access, codeVerify } = useSelector((state) => state);

  useEffect(() => {
    if (codeVerify !== "") {
      props.navigation.navigate("Verify", {
        phoneNumber: phoneNumber,
      });
    }
  }, [codeVerify]);

  function goToHomePage() {
    if (codeVerify) {
      props.navigation.navigate("Verify", {
        phoneNumber: phoneNumber,
      });
    } else {
      props.navigation.navigate("HomePage", {
        phoneNumber: phoneNumber,
      });
    }
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
        <Text style={text.textHeader}>Verify Your Number</Text>
        <TextInput
          style={inputText.inputText}
          value={phoneNumber}
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          onChangeText={(e) => setPhoneNumber(e)}
          placeholder="phone number..."
          maxLength={13}
          minLength={11}
          placeholderTextColor="black"
        />
      </View>

      <TouchableHighlight onPress={login}>
        <View style={button.buttonBig}>
          <Text style={text.textButton}>SEND</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
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
