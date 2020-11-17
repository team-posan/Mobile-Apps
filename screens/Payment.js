import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

export default function Payment(props) {
  const dispatch = useDispatch();
  const { paymentBills, amount, orders, access } = useSelector(
    (state) => state
  );

  const [idToPayment, setIdToPayment] = useState([]);

  // useEffect(() => {
  //   // dispatch(checkout(access));
  //   console.log(access,' ini access dari payment');
  // }, []);

  useEffect(() => {
    console.log(orders, "ini yang dicari");
    if (orders) {
      let idCartsFilter = orders.map((item) => {
        return item.id;
      });
      setIdToPayment(idCartsFilter);
      console.log(idCartsFilter);
    }
  }, [orders]);

  function goToCompleate() {
    props.navigation.navigate("Compleate");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Compleate Your Order</Text>
        <Text> payment bills {paymentBills}</Text>
        <Text style={{ marginTop: 300 }}>{amount}</Text>
        {/* <Text> amount {JSON.stringify(orders)}</Text> */}
        <Text style={{ marginTop: 50 }}>{JSON.stringify(idToPayment)}</Text>
      </View>

      <TouchableOpacity style={styles.rightBottomBar} onPress={goToCompleate}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Payment
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
});
