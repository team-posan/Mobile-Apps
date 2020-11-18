import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { loginCustomer } from "../store/actions/storeActions";
import { text, inputText, button } from "../styles/index";
import { Button, Icon, Layout, Text, Input } from '@ui-kitten/components';

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
    <Layout style={styles.container} level='1'>
      <View style={styles.inputBox}>
        <Text category='h1'>POSAN</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Input
            style={styles.inputText}
            dataDetectorTypes="phoneNumber"
            placeholder='Phone number. e.g. 08...'
            value={phoneNumber}
            maxLength={13}
            minLength={11}
            keyboardType="phone-pad"
            onChangeText={(e) => setPhoneNumber(e)}
          />
           <Button
            style={{backgroundColor: "#1E2749"}}
            onPress={login}>
            Send
          </Button>
        </View>
      </View>

      {/* <TouchableHighlight onPress={login}>
        <View style={button.buttonBig}>
          <Text style={text.textButton}>SEND</Text>
        </View>
      </TouchableHighlight> */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 15,
    width: 230,
    marginRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'flex-end',
    // marginBottom: 50
    paddingBottom: 100
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
