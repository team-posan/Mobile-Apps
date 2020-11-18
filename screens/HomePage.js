import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { fetchStore } from "../store/actions/storeActions";
import { Text, Card, Divider } from '@ui-kitten/components'

const width = Dimensions.get('screen').width

export default function HomePage(props) {
  const dispatch = useDispatch();
  const { dataStore, access, codeVerify } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchStore());
  }, []);

  // const { phoneNumber } = props.route.params;

  const [storeId, setStoreId] = useState();

  function storeIdHandler(storeId) {
    setStoreId(storeId);
    const storeSelected = dataStore.filter(store => store.id === storeId)
    props.navigation.navigate("Store", {
      storeId: storeId,
      storeName: storeSelected.name
    });
  }

  function goToHistory() {
    props.navigation.navigate("History");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text category='h4' style={{ color: "white" }}>
          Hi, Customer
           {/* <Text category='h4' style={{ marginBottom: 10, textAlign: 'left' }}>
            Pilih Toko
          </Text> */}
        </Text>
        <Text  style={{ color: "white" }}>
          Choose Store
        </Text>
      </View>
      <View style={styles.productsContainer}>
        <View style={{
          padding: 10
        }}>
         
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View>
            {dataStore.map((item) => {
              return (
                <Card key={item.id}
                  style={{marginBottom: 10}}
                  onPress={() => storeIdHandler(item.id)}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                      "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                    />
                  <View style={styles.innerTextCards}>
                    <Text category='h5' style={{fontWeight: 'bold'}}>{item.store_name}</Text>
                    <Divider style={{marginRight:10}} />
                    <Text  >{item.store_address}</Text>
                    {/* <Text>{item.id}</Text> */}
                  </View>
                </View>
              </Card>
              );
            })}
            {/* <TouchableOpacity
                  style={styles.card}
                  key={item.id}
                  onPress={() => storeIdHandler(item.id)}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                  />
                  <View style={styles.innerTextCards}>
                    <Text h4>{item.store_name}</Text>
                    <Text>{item.store_address}</Text>
                    <Text>{item.id}</Text>
                  </View>
                </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.menuNav}>
        <View style={styles.left}>
          <Text>Discover</Text>
        </View>
        <TouchableOpacity onPress={goToHistory}>
          <View style={styles.right}>
            <Text>History</Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:41,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  header: {
    height: 120,
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
    borderRadius: 3,
    marginLeft: -5,
    marginTop:6,
    marginBottom:3
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
