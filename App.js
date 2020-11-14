import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LandingPage,
  HomePage,
  Store,
  Order,
  Payament,
  Compleate,
} from "./screens/index";


const Stack = createStackNavigator();

Stack.Navigator.defaultProps = {
  headerMode: "none",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Payment" component={Payament} />
        <Stack.Screen name="Compleate" component={Compleate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
