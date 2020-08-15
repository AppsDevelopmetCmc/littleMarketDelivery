import React from "react";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Mapa } from "../../map/Mapa";
import { Ruta } from "../../map/Ruta";
import { ResumenPedido } from "../../pedidos/ResumenPedido";
import { DetalleProductosPedido } from "../../pedidos/DetalleProductosPedido";
import { navOptionHandler } from "../../../utils/Validaciones";

import { HomeTab } from "./NavigationTabBottom";

const StackFromTabs = createStackNavigator();
const StackDirection = createStackNavigator();
export function ScreensFromTabs() {
  return (
    <StackFromTabs.Navigator initialRouteName="HomeTab">
      <StackFromTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={navOptionHandler(false)}
      ></StackFromTabs.Screen>
      <StackDirection.Screen name="Mapa" component={Mapa} />
      <StackDirection.Screen name="Ruta" component={Ruta} />
      <StackDirection.Screen name="ResumenPedido" component={ResumenPedido} />
      <StackDirection.Screen name="DetalleProductosPedido" component={DetalleProductosPedido} />
    </StackFromTabs.Navigator>
  );
}
