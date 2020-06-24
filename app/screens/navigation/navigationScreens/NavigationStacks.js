import React from "react";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PaginaInicio from "../../PaginaInicio";
import Registro from "../../account/Registro";
import IniciaSesion from "../../account/IniciarSesion";
import RecuperarCuenta from "../../account/RecuperarCuenta";
import { navOptionHandler } from "../../../utils/Validaciones";
import { ListaItemsPedidoCombo } from "../../repartidor/ListaItemsPedidoCombo";
import { ListaPedidoCombo } from "../../repartidor/ListaPedidoCombo";
import * as colores from "../../../constants/Colores";

const StackLogin = createStackNavigator();
const StackRepartidor = createStackNavigator();

export function LoginStack() {
  return (
    <StackLogin.Navigator>
      <StackLogin.Screen
        name="Pagina Inicio"
        component={PaginaInicio}
        options={navOptionHandler(false)}
      ></StackLogin.Screen>
      <StackLogin.Screen
        name="Registro"
        component={Registro}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colores.colorPrimarioVerde,
            elevation: 0, //remove shadow on Android
            shadowOpacity: 0, //remove shadow on iOS
          },
          headerTintColor: "#fff",
        }}
      ></StackLogin.Screen>
      <StackLogin.Screen
        name="IniciaSesion"
        component={IniciaSesion}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colores.colorPrimarioVerde,
            elevation: 0, //remove shadow on Android
            shadowOpacity: 0, //remove shadow on iOS
          },
          headerTintColor: "#fff",
        }}
      ></StackLogin.Screen>
      <StackLogin.Screen
        name="RecuperarCuenta"
        component={RecuperarCuenta}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colores.colorPrimarioVerde,
            elevation: 0, //remove shadow on Android
            shadowOpacity: 0, //remove shadow on iOS
          },
          headerTintColor: "#fff",
        }}
      ></StackLogin.Screen>
    </StackLogin.Navigator>
  );
}

export function RepartidorStackScreen() {
  return (
    <StackRepartidor.Navigator>
      <StackRepartidor.Screen
        name="ListaPedidoComboScreen"
        component={ListaPedidoCombo}
        options={navOptionHandler(false)}
      />
      <StackRepartidor.Screen
        name="ListaItemsPedidoComboScreen"
        component={ListaItemsPedidoCombo}
        options={navOptionHandler(false)}
      />
    </StackRepartidor.Navigator>
  );
}
