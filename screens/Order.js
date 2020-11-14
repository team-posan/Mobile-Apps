import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Divider } from "react-native-elements";
import image from "../assets/backgroundOrder.jpg";

export default function Order(props) {
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
            <Text style={{ fontSize: 12 }}>Rp.50.000</Text>
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rp.3.500</Text>
            </View>
          </Divider>
        </View>
      </View>
      <View style={styles.boxListOrder}>
        <Text h5 style={{ fontWeight: "bold" }}>
          Order Items
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {dummy.map((item) => {
              return (
                <TouchableOpacity style={styles.card} key={item.id}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                  />
                  <View style={styles.innerTextCards}>
                    <Text h4>CoffeShop</Text>
                    <Text>Outlet Address Street, Jakarta Selatan</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Button style={styles.checkoutBtn} title="halo" onPress={goToPayment} />
      <TouchableOpacity style={styles.rightBottomBar} onPress={goToPayment}>
        <View style={styles.checkoutBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
            Process Checkout
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 20,
    width: 300,
    height: 420,
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
    top: 500,
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
});
