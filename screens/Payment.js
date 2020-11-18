import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { checkout, paymentServices } from "../store/actions/storeActions";
import axios from "axios";

export default function Payment(props) {
  // <<<<<<< dev-apps
  const [cekStatusUrl, setCekStatusUrl] = useState("");
  const [statusPay, setStatusPay] = useState("");

  const dispatch = useDispatch();
  const { paymentBills, amount, orders, payment } = useSelector(
    (state) => state
  );

  const [idToPayment, setIdToPayment] = useState([]);

  useEffect(() => {
    console.log(payment.statusUrl, "??????");
  }, [payment]);

  const [cekLink, setCekLink] = useState("testing");

  useEffect(() => {
    console.log(orders, "ini yang dicari");
    if (orders) {
      let idCartsFilter = orders.map((item) => {
        return item.id;
      });
      setIdToPayment(idCartsFilter);
      console.log(idCartsFilter, ">>>>");
    }
  }, [orders]);
  //   const [ idToPay, setIdToPay ] = useState([])
  //   const { orders, access } = useSelector((state) => state);

  //   useEffect(() => {
  //     const filterId = orders.map(cart => cart.id)
  //     setIdToPay(filterId)
  //     // console.log('dari payment')
  //   }, [orders])

  //   const dispatch = useDispatch()
  // >>>>>>> layout

  function goToCompleate() {
    // console.log('dari payment', orders)
    dispatch(paymentServices(idToPayment, paymentBills));
    // cekStatusUrl()
    // .then(test => {console.log(test)})
    setTimeout(() => {
      props.navigation.navigate("Compleate");
    }, 3000);
  }

  const request = () => {
    console.log(idToPayment, "asdasd");
    axios
      .get(`${payment.statusUrl}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci00QjR5WFZJdjFDODBYbXF0amJlUExtQU06",
        },
      })
      .then((result) => {
        console.log(result.data, "waduh");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHeader}>Pay With Go-Pay</Text>
        <Text style={styles.paymentBills}>Total Amount {paymentBills}</Text>
      </View>

      <Image
        source={require("../assets/undraw_powerful_26ry.png")}
        style={{ width: 330, height: 200, backgroundColor: "gray" }}
      />
      <TouchableOpacity onPress={goToCompleate}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Process Payment
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
  textHeader: {
    width: 250,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1E2749",
  },
  paymentBills: {
    width: 250,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1E2749",
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
