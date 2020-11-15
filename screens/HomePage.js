import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "react-native-elements";
import { fetchStore } from "../store/actions/storeActions";

export default function HomePage(props) {
  const dispatch = useDispatch();
  const { dataStore } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchStore());
  }, []);

  const { phoneNumber } = props.route.params;

  const [storeId, setStoreId] = useState();

  function storeIdHandler(storeId) {
    setStoreId(storeId);
    props.navigation.navigate("Store", {
      storeId: storeId,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4 style={{ color: "white" }}>
          Hai, User
        </Text>
        <Text h5 style={{ fontWeight: "bold", color: "white" }}>
          {phoneNumber}
        </Text>
      </View>
      <View style={styles.productsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text h5 style={{ fontWeight: "bold" }}>
            Pilih Toko Terdekat
          </Text>
          <View>
            {dataStore.map((item) => {
              return (
                <TouchableOpacity
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
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.menuNav}>
        <View style={styles.left}>
          <Text>Discover</Text>
        </View>
        <View style={styles.right}>
          <Text>History</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    justifyContent: "space-around",
  },
  header: {
    height: 150,
    backgroundColor: "#1E2749",
    borderBottomRightRadius: 50,
    borderColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    padding: 30,
    marginTop: -10,
  },
  productsContainer: {
    height: 580,
    backgroundColor: "#C4C4C4",
    padding: 30,
  },

  card: {
    width: 330,
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
  },
  image: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginLeft: -5,
  },
  innerTextCards: {
    width: 200,
    height: 100,
    marginLeft: 20,
    padding: 10,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  menuNav: {
    width: 400,
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
