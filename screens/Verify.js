// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { StyleSheet, View, Button, TextInput } from "react-native";
// import { Text } from "react-native-elements";
// import { loginCustomer } from "../store/actions/storeActions";

// // import LottieView from "lottie-react-native";

// export default function Verify(props) {
//   const dispatch = useDispatch();
//   const [inputCode, setVerifyCode] = useState("");

//   const { access, codeVerify } = useSelector((state) => state);

//   function goToHomePage() {
//     const { phoneNumber } = props.route.params;
//     props.navigation.navigate("HomePage", {
//       phoneNumber: phoneNumber,
//     });
//   }

//   function verivyCodeHandler() {
//     if (codeVerify === inputCode) {
//       goToHomePage();
//     } else {
//       console.log("invalid code verification!");
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputBox}>
//         <Text style={styles.text}>
//           VERIFICATION CODE {JSON.stringify(codeVerify)}
//         </Text>
//         <TextInput
//           style={styles.input}
//           dataDetectorTypes="phoneNumber"
//           keyboardType="phone-pad"
//           onChangeText={(e) => setVerifyCode(e)}
//           placeholder="_ _ _ _"
//           maxLength={4}
//         />
//       </View>

//       <Button
//         style={{ width: 200 }}
//         color="#E14C17"
//         title="VERIFY"
//         onPress={verivyCodeHandler}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   text: {
//     width: 250,
//     fontSize: 20,
//     textAlign: "center",
//   },
//   input: {
//     height: 40,
//     width: 250,
//     borderColor: "#1E2749",
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: "center",
//     backgroundColor: "white",
//   },
//   inputBox: {
//     width: 400,
//     height: 300,
//     backgroundColor: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
// });
