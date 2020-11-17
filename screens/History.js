import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { fetchCartsHistory } from "../store/actions/storeActions";

export default function History() {
  const dispatch = useDispatch();
  const { orders, carts, history, access } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCartsHistory(access));
  }, []);
  return (
    <View>
      <Text>HALO</Text>
      <Text> orders data {JSON.stringify(orders)}</Text>
      <Text> orders data {JSON.stringify(carts)}</Text>
      <Text> orders data {JSON.stringify(history)}</Text>
    </View>
  );
}
