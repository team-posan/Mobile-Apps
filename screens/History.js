import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { fetchCartsHistory } from "../store/actions/storeActions";
import { Text, Card } from '@ui-kitten/components'
import { FlatList, ScrollView } from "react-native-gesture-handler";


export default function History() {
  const dispatch = useDispatch();
  const { orders, carts, history, access } = useSelector((state) => state);

  useEffect(() => {
    // console.log(access)
    dispatch(fetchCartsHistory(access));
  }, []);


  useEffect(() => {
    // console.log(access)
    dispatch(fetchCartsHistory(access));
  }, [access]);


  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text category='h1' style={{ color: "white" }}>
          History
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {
              history !== undefined ? history.map(historyCart => {
                if (historyCart.payment_status === 'done' || historyCart.payment_status === 'unpaid') {
                  return (
                    <Card style={{
                      margin: 10
                    }}
                    key={historyCart.id}
                    >
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <View>
                          <Text category='h6' >{historyCart.quantity} {historyCart.Product.product_name}</Text>
                          <Text>{historyCart.createdAt.split('T')[0]}, {historyCart.createdAt.split('T')[1].slice(0, 5)}</Text>
                        </View>
                        <View>
                          <Text>{historyCart.payment_status}</Text>
                          <Text>#{historyCart.id}</Text>
                        </View>
                      </View>
                    </Card>
                  )
                }
              })
              : <View style={{
                alignItems: 'center',
                margin: 10
              }}>
                <Text category='h5'>Ups..</Text>
              </View>
          }
        </View>
        </ScrollView>
      {/* <Text> orders data {JSON.stringify(history)}</Text> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  header: {
    height: 150,
    backgroundColor: "#1E2749",
    // borderBottomRightRadius: 50,
    // borderColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    padding: 30,
    // marginTop: -10,
  },
  productsContainer: {
    height: '85%',
    // backgroundColor: "#C4C4C4",
    paddingLeft: 30,
    paddingRight: 30,
  },

  card: {
    width: '95%',
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 0,
    borderRadius: 10,

    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: -5,
  },
  innerTextCards: {
    width: 210,
    // height: 100,
    marginLeft: 20,
    // padding: 10,
    // backgroundColor: "transparent",
    // justifyContent: "flex-start",
  },
  menuNav: {
    width: '100%',
    height: 50,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
  },
  left: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
