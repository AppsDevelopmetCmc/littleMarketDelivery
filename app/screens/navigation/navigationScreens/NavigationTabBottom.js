import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ListaCompras } from "../../compras/ListaCompras";
import { ListaPedidos } from "../../pedidos/ListaPedidos";

const TabHome = createBottomTabNavigator();

export function HomeTab() {
  return (
    <TabHome.Navigator>
      <TabHome.Screen
        name="ListaCompras"
        component={ListaCompras}
      ></TabHome.Screen>
      <TabHome.Screen
        name="ListaPedidos"
        component={ListaPedidos}
      ></TabHome.Screen>
    </TabHome.Navigator>
  );
}
