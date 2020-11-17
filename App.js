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
  Verify,
} from "./screens/index";

import { Provider as StateProvider } from "react-redux";
import store from "./store/index";

const Stack = createStackNavigator();

Stack.Navigator.defaultProps = {
  headerMode: "none",
  initialRouteName: "Landing",
};

export default function App() {
  return (
    <StateProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Payment" component={Payament} />
          <Stack.Screen name="Compleate" component={Compleate} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
