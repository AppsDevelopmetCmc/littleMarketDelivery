import React from "react";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PaginaInicio from "../../PaginaInicio";
import Registro from "../../account/Registro";
import IniciaSesion from "../../account/IniciarSesion";
import { navOptionHandler } from "../../../utils/Validaciones";

const StackLogin = createStackNavigator();

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
      ></StackLogin.Screen>
      <StackLogin.Screen
        name="IniciaSesion"
        component={IniciaSesion}
      ></StackLogin.Screen>
    </StackLogin.Navigator>
  );
}
