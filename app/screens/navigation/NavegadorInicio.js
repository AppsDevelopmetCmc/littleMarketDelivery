import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, Text } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PaginaInicio from "../PaginaInicio";
import Registro from "../account/Registro";
import IniciaSesion from "../account/IniciarSesion";
import { ListaCompras } from "../compras/ListaCompras";
import { ListaPedidos } from "../pedidos/ListaPedidos";

import MiCuenta from "../account/MiCuenta";
import Mapa from "../map/Mapa";
import Cargando from "../../components/Cargando";
import { cargarConfiguracion } from "../../utils/FireBase";

const StackAuthentication = createStackNavigator();
const StackLogin = createStackNavigator();
const TabHome = createBottomTabNavigator();

if (!global.firebaseRegistrado) {
  cargarConfiguracion();
}
const navOptionHandler = (isValue) => ({
  headerShown: isValue,
});

function AuthenticationStack() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, [login]);

  if (login === null) {
    return <Cargando isVisible={true} text="Cargando ..."></Cargando>;
  } else {
    return (
      <StackAuthentication.Navigator>
        {login ? (
          <StackAuthentication.Screen
            name="HomeTab"
            component={HomeTab}
            options={navOptionHandler(false)}
          ></StackAuthentication.Screen>
        ) : (
          <StackAuthentication.Screen
            name="LoginStack"
            component={LoginStack}
            options={navOptionHandler(false)}
          ></StackAuthentication.Screen>
        )}
      </StackAuthentication.Navigator>
    );
  }
}

function HomeTab() {
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
function LoginStack() {
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

export default function NavegadorInicio() {
  return (
    <NavigationContainer>
      <AuthenticationStack></AuthenticationStack>
    </NavigationContainer>
  );
}
