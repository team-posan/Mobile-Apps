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
  BackHandler,
} from "react-native";
// import { Divider } from "react-native-elements";
import image from "../assets/backgroundOrder.jpg";
import {
  removeCartById,
  editCartBeforeCheckout,
  checkout,
  paymentBills,
  clearAll,
} from "../store/actions/storeActions";

import { Divider } from '@ui-kitten/components'


export default function Order(props) {
  const dispatch = useDispatch();
  // modals
  const [modalVisible, setModalVisible] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [ProductIdEdited, setProductId] = useState(0);

  // bills
  const { itemQuantity, total } = props.route.params;
  const [bills, setBills] = useState(total);
  const [itemPrice, setSelectedItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalItem, setTotalItems] = useState(itemQuantity);
  const { access, carts } = useSelector((state) => state);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "This will remove your carts", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => dispatch(clearAll()) },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (carts.length < 1) {
      props.navigation.navigate("Store");
    }
  }, [carts]);

  function showModals(ProductId, price, quantity) {
    setProductId(ProductId);
    setSelectedItemPrice(price);
    setQuantity(+quantity);
    setModalVisible(true);
  }

  function editQuantity(newQuantity) {
    dispatch(editCartBeforeCheckout(+newQuantity, ProductIdEdited));
    setModalVisible(!modalVisible);
    let selisihQty = +newQuantity - quantity;
    let minusPrice = itemPrice * selisihQty;
    setBills(minusPrice + bills);
    setTotalItems(Number(totalItem) + Number(selisihQty));
  }

  function removeFromCarts() {
    dispatch(removeCartById(ProductIdEdited));
    setModalVisible(!modalVisible);
    let minusPrice = itemPrice * quantity;
    setBills(bills - minusPrice);
    setTotalItems(totalItem - quantity);
  }

  function checkoutHandler() {
    let filteredData = carts.map((item) => {
      return {
        ProductId: item.ProductId,
        quantity: item.quantity,
        payment_status: item.payment_status,
      };
    });
    console.log(filteredData, "filtered data checkout order");
    dispatch(checkout(filteredData, access));
    dispatch(paymentBills(bills, totalItem));
    props.navigation.navigate("Payment");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.boxHeader}>
          <Text style={{ fontSize: 10, color: "#fff", fontStyle: "italic" }}>
            Total Bills
          </Text>
          <Text style={styles.total}>Rp. {bills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-</Text>
          <Text style={styles.items}>{totalItem} items</Text>
        </View>
      </View>

      <View style={styles.boxOrder}>
        <View style={styles.headerOrder}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "black",
              marginLeft: 30,
            }}
          >
            Order List
          </Text>
        </View>

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

                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(e) => setNewQuantity(e)}
                  placeholder="insert new quantity"
                  maxLength={2}
                  minLength={0}
                />

                <View
                  style={{
                    flexDirection: "row",
                    width: 300,
                    height: 100,
                  }}
                >
                  <TouchableHighlight
                    onPress={() => {
                      editQuantity(newQuantity);
                    }}
                  >
                    <Text>Submit</Text>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={removeFromCarts}>
                    <Text style={styles.textStyle}>Remove From Carts</Text>
                  </TouchableHighlight>

                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartsSection}>
            {carts
              ? carts.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.card}
                      key={index}
                      onPress={() => {
                        showModals(item.ProductId, item.price, item.quantity);
                      }}
                    >
                      <View style={styles.cart} key={index}>
                        <Image
                          style={styles.cartImage}
                          source={{ uri: item.Product.image_url }}
                        />
                        <View style={styles.cartText} key={index}>
                          <Text h4 style={{ fontWeight: "bold", fontSize: 20 }}>
                            {item.Product.product_name}
                          </Text>
                          <Divider/>
                          <Text>Price Rp.{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-</Text>
                          <Text>{item.quantity} items</Text>
                          {/* <Text style={{ fontWeight: "bold" }}>
                            Totals {item.quantity * item.price}
                          </Text> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
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
              <Text style={styles.modalText}>Edit Quantity</Text>

              <TextInput
                style={{
                  width: 200,
                  height: 50,
                  textAlign: "center",
                  backgroundColor: "#F8F8F8",
                  marginBottom: 20,
                }}
                keyboardType="numeric"
                onChangeText={(e) => setNewQuantity(e)}
                placeholder="insert new quantity"
                maxLength={2}
                minLength={0}
              />
              <View
                style={{
                  width: 200,
                  height: 40,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableHighlight
                  onPress={() => {
                    editQuantity(newQuantity);
                  }}
                >
                  <View
                    style={{
                      width: 95,
                      height: 40,
                      backgroundColor: "#1E2749",
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "white",
                      }}
                    >
                      Submit
                    </Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={removeFromCarts}>
                  <View
                    style={{
                      width: 95,
                      height: 40,
                      backgroundColor: "#E14C17",
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "white",
                      }}
                    >
                      Remove
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={{ marginTop: 70, justifyContent: "flex-end" }}>
                  <Text style={{ color: "#1E2749", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={{
          maxWidth: 400,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
        onPress={checkoutHandler}
      >
        <View
          style={{
            width: 350,
            height: 50,
            marginLeft:11,
            backgroundColor: "#1E2749",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Process Checkout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    marginTop:41,

  },
  header: {
    height: 120,
    alignItems: "flex-start",
    backgroundColor: "#1E2749",
    justifyContent: "center",
    alignItems: "flex-start",
    // marginVertical:30
    paddingBottom:28
  },
  boxHeader: {
    marginVertical:10,
    // top: 0,
    width: 150,
    height: 80,
    left: 40,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  total: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 1,
    // textShadowColor: "#000",
  },
  items: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  boxOrder: {
    top: -30,
    height: 520,
    backgroundColor: "#fff",
    // borderTopRightRadius: 3,
    // borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    // elevation: 2,
  },
  headerOrder: {
    top: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cartsSection: {
    // flex: 1,
    height: 500,
    top: 20,
    // flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cart: {
    marginTop: 10,
    minWidth: 350,
    height: 120,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
  },
  cartImage: {
    left: 10,
    width: 120,
    height: 100,
    borderTopLeftRadius: 5,
  },
  cartText: {
    left: 30,
    maxWidth: 200,
    height: 100,
    color: "black",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  // modals

  modalView: {
    height: 300,
    width: 300,
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
    justifyContent: "space-between",
  },
  openButton: {
    backgroundColor: "#1E2749",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  removeButton: {
    backgroundColor: "red",
    backgroundColor: "#1E2749",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
