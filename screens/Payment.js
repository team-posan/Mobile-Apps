import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { checkout, paymentServices } from "../store/actions/storeActions";
import axios from 'axios'

// import LottieView from "lottie-react-native";

export default function Payment(props) {
// <<<<<<< dev-apps
  const [ cekStatusUrl, setCekStatusUrl ] = useState('')
  const [ statusPay, setStatusPay ] = useState('')

  const dispatch = useDispatch();
  const { paymentBills, amount, orders, payment } = useSelector(
    (state) => state
  );

  const [idToPayment, setIdToPayment] = useState([]);

  useEffect(() => {
    console.log(payment.statusUrl, '??????')
  }, [payment]);

  const [cekLink, setCekLink ] = useState('testing')

  useEffect(() => {
    console.log(orders, "ini yang dicari");
    if (orders) {
      let idCartsFilter = orders.map((item) => {
        return item.id;
      });
      setIdToPayment(idCartsFilter);
      console.log(idCartsFilter, '>>>>');
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
    dispatch(paymentServices(idToPayment, paymentBills))
    // cekStatusUrl()
    // .then(test => {console.log(test)})
    // props.navigation.navigate("Compleate");
  }

  const request = () => {
    axios.get(`${payment.statusUrl}`,{
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1nZmN5RnBDMC15N1B6T2FoVG9Ta2s0eUw6'
      }
    })
      .then(result=>{
        console.log(result.data,'asu')
      })
      .catch(err=>{
        console.log(err)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.text}>Compleate Your Order</Text>
        <Text> payment bills {paymentBills}</Text>
        <Text> amount {amount}</Text>
        <Text style={{ marginTop: 50 }}>{JSON.stringify(idToPayment)}</Text>

         {/* <Text style={styles.text}>Complete Your Order</Text> */}

      </View>

      <TouchableOpacity style={styles.rightBottomBar} onPress={goToCompleate}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Payment
          </Text>
        </View>
      </TouchableOpacity>
      <Button
        title="request"
        onPress={request}
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
