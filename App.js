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
  History,
} from "./screens/index";
import * as eva from '@eva-design/eva';
import { BottomNavigation, BottomNavigationTab, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { Provider as StateProvider } from "react-redux";
import store from "./store/index";

const Stack = createStackNavigator();

Stack.Navigator.defaultProps = {
  headerMode: "none",
  initialRouteName: "Landing",
};

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='DISCOVER'/>
    <BottomNavigationTab title='HISTORY'/>
  </BottomNavigation>
);

function MainNaviigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Payment" component={Payament} />
      <Stack.Screen name="Compleate" component={Compleate} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}

export default function App() {

  // Linking.addEventListener('/', (a,b,c)=>{
  //   console.log(a,b,c, 'asdasdas<<<<<<<')
  // })

  // Linking.addEventListener('/failure', (a,b,c)=>{
  //   console.log(a,b,c, 'asdasdas<<<<<<<')
  // })

  return (
    <StateProvider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar style="dark"/>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Tab.Screen name="Discover" component={MainNaviigation} />
            <Tab.Screen name="History" component={History} />
          </Tab.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </StateProvider>
  );
}
