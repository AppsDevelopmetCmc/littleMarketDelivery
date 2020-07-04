import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ListaCompras } from "../../compras/ListaCompras";
import { ListaPedidos } from "../../pedidos/ListaPedidos";
import { RepartidorStackScreen } from "./NavigationStacks";
import { Button, Avatar, Input, Icon } from "react-native-elements";

import * as colores from "../../../constants/Colores";

const TabHome = createBottomTabNavigator();

export function HomeTab() {
  return (
    <TabHome.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let tipo = "material-community";

          if (route.name === "ListaPedidos") {
            iconName = "store";
          } else if (route.name === "RepartidorStackScreen") {
            iconName = "basket";
          }

          return <Icon name={iconName} size={size} color={color} type={tipo} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colores.colorOscuroPrimarioVerde,
        inactiveTintColor: colores.colorClaroTexto,
      }}
    >
      {/* <TabHome.Screen
        name="ListaCompras"
        component={ListaCompras}
      ></TabHome.Screen> */}
      <TabHome.Screen
        name="ListaPedidos"
        component={ListaPedidos}
      ></TabHome.Screen>
      <TabHome.Screen
        name="RepartidorStackScreen"
        component={RepartidorStackScreen}
        options={{ tabBarLabel: "Verificar" }}
      />
    </TabHome.Navigator>
  );
}
