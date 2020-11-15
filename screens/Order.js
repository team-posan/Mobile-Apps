import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Modal,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Divider } from "react-native-elements";
import image from "../assets/backgroundOrder.jpg";
import { fetchOrdersCarts } from "../store/actions/storeActions";

export default function Order(props) {
  // modals
  const [modalVisible, setModalVisible] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);

  // state
  const { access, orders } = useSelector((state) => state);
  const dispatch = useDispatch();
  const dummy = [
    {
      id: 1,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 6,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 7,
      title: "Store A",
      desc: "awaw",
      uri:
        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  useEffect(() => {
    dispatch(fetchOrdersCarts(access));
  }, []);

  const { itemQuantity, total } = props.route.params;

  function goToPayment() {
    console.log("navigate to checkout page");
    props.navigation.navigate("Payment");
  }

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          style={styles.headerOrder}
          source={image}
          imageStyle={{
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
          }}
        >
          <Text style={styles.headerOrderText}>Order</Text>
        </ImageBackground>
      </View>
      <View style={styles.boxBill}>
        <View style={styles.bill}>
          <View
            style={{
              width: 250,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              //   backgroundColor: "black",
            }}
          >
            <Text style={{ fontSize: 12 }}>Sub Total</Text>
            <Text style={{ fontSize: 12 }}>Rp.{total}</Text>
          </View>
        </View>
        <View style={styles.bill}>
          <View
            style={{
              width: 250,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              //   backgroundColor: "black",
            }}
          >
            <Text style={{ fontSize: 12 }}>Tax</Text>
            <Text style={{ fontSize: 12 }}>Rp.3.500</Text>
          </View>
        </View>

        <View style={styles.bill}>
          <Divider style={{ top: 10 }}>
            <View
              style={{
                width: 250,
                marginTop: 10,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Totals</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Rp.{total + 3500}
              </Text>
            </View>
          </Divider>
        </View>
      </View>
      {/* modals */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit quantity</Text>
              <Text>{newQuantity}</Text>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(e) => setNewQuantity(e)}
                placeholder="insert quantity"
                maxLength={1}
                minLength={0}
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.removeButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Remove</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      {/* modals end */}

      <View style={styles.boxListOrder}>
        <Text h5 style={{ fontWeight: "bold" }}>
          Order Items
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>{JSON.stringify(orders)}</Text>
          <View>
            {orders.carts.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={item.id}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                  />
                  <View style={styles.innerTextCards}>
                    <Text h4>Product ID : {item.ProductId}</Text>
                    <Text>quantity : {item.quantity}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <TouchableHighlight style={styles.rightBottomBar} onPress={goToPayment}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Process Checkout
          </Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Proccess Checkout"
        style={{ marginTop: 200 }}
        onPress={goToPayment}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  headerOrder: {
    flex: 1,
    height: 200,
    alignItems: "flex-start",
  },
  headerOrderText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    top: 80,
    left: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bill: {
    width: 200,
    height: 25,
    top: 20,
    left: 22,
    flexDirection: "row",
  },
  boxBill: {
    flex:0.5,
    width: 300,
    height: 120,
    backgroundColor: "#fff",
    top: 130,
    left: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  boxListOrder: {
    flex: 1.2,
    width: 300,
    backgroundColor: "#fff",
    left: 50,
    top:-100,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    padding: 20,
  },
  card: {
    width: 260,
    height: 80,
    backgroundColor: "#fff",
    display: "flex",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#EFEFEF",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    left: 10,
  },
  innerTextCards: {
    width: 200,
    height: 100,
    padding: 10,
    top: 5,
    left: 15,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  checkoutBtn: {
    top: 150,
    left: 50,
    width: 300,
    height: 40,
    backgroundColor: "#1E2749",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // modals
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
