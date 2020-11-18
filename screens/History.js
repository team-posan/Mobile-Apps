import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { fetchCartsHistory } from "../store/actions/storeActions";
import { Button, Modal, Text, Card } from '@ui-kitten/components'
import { FlatList, ScrollView } from "react-native-gesture-handler";

const renderListHistory = (dataCartGroup) => {

}

export default function History() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const [groupCartToShow, setGroupCartToShow] = useState({
    date: '',
    carts: []
  })
  const { orders, carts, history, access } = useSelector((state) => state);

  useEffect(() => {
    // console.log(access)
    dispatch(fetchCartsHistory(access));
  }, []);


  useEffect(() => {
    // console.log(access)
    dispatch(fetchCartsHistory(access));
  }, [access]);

  const showModalHandler = (cartGroup, dateBuy) => {
    setGroupCartToShow({...groupCartToShow, 
      date: dateBuy,
      carts: cartGroup
    })
    setVisible(true)
  }


  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text category='h1' style={{ color: "white" }}>
          History
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text>{JSON.stringify(history, null, 4)}</Text> */}
        <View>
          {
            history !== undefined ? Object.keys(history).map((cartGroup, index) => {
              // console.log('???...', history[cartGroup])
              return (
                <Card style={{
                  margin: 10
                }}
                  onPress={() => showModalHandler(history[cartGroup], cartGroup)}
                  key={cartGroup}
                >
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <View>
                      <Text category='h6' >{history[cartGroup].length} Item</Text>
                      <Text>{history[cartGroup][0].createdAt.split('T')[0]}, {history[cartGroup][0].createdAt.split('T')[1].slice(0, 5)}</Text>
                      <View>
                        
                      </View>
                    </View>
                    <View>
                      <Text>{history[cartGroup][0].payment_status}</Text>
                      <Text>#{history[cartGroup][0].id}</Text>
                    </View>
                  </View>
                </Card>
              )
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
          {
            groupCartToShow.date !== '' 
            ? <Modal
            visible={visible}
            style={{
              width: '90%'
            }}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)',}}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
            <Text style={{marginBottom: 10}} category='h5' >Transaction at {groupCartToShow.date.split('T')[0]}, {groupCartToShow.date.split('T')[1].slice(0, 5)}</Text>
              <View>
                {
                  groupCartToShow.carts.map(cart => {
                    return (
                      <Card
                        key={cart.id}
                        style={{
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                          <View>
                      <Text category='h6' >{cart.Product.product_name}</Text>
                      <Text category='h6' >{cart.quantity} * Rp{(cart.Product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-</Text>
                      {/* <Text category='h6' >Rp {(cart.quantity*cart.Product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Text> */}
                            {/* <Text>{cart.createdAt.split('T')[0]}, {cart.createdAt.split('T')[1].slice(0, 5)}</Text> */}
                            <View>
                              
                            </View>
                          </View>
                          <View>
                      <Text category='h6' >Rp {(cart.quantity*cart.Product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Text>

                            {/* <Text>{cart.payment_status}</Text>
                            <Text>#{cart.id}</Text> */}
                          </View>
                        </View>
                      </Card>
                    )
                  })
                }
              </View>
              <Text category='h6' style={{
                margin: 10,
                padding: 5,
                textAlign: 'right'
              }} >Total Rp {
                (groupCartToShow.carts.map(o => (o.quantity * o.Product.price)).reduce((a, c) => { return a + c })).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              },-</Text>

              <View>
                <Button style={{backgroundColor:'#E14C17'}} onPress={() => setVisible(false)}>
                  Close
                </Button>
              </View>
            </Card>
          </Modal>
          : <></>
          }
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
