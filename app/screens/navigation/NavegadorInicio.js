import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, Text, Alert } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Cargando from "../../components/Cargando";
import { cargarConfiguracion } from "../../utils/FireBase";
import { VerificacionMail } from "../account/form/VerificacionMail";
import { PerfilDistribuidor } from "../account/PerfilDistribuidor";

// Importación de NavigationStacks
import { LoginStack } from "./navigationScreens/NavigationStacks";
import { ScreensFromTabs } from "./navigationScreens/NavigationFromTabs";

// Importacion de funciones
import { navOptionHandler } from "../../utils/Validaciones";

const StackAuthentication = createStackNavigator();

if (!global.firebaseRegistrado) {
  cargarConfiguracion();
}

function AuthenticationStack() {
  const [login, setLogin] = useState(null);
  const [verificacionMail, setVerificacionMail] = useState(false);
  const [verificacionPerfil, setVerificacionPerfil] = useState(false);
  console.log("Logiin", login);

  try {
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        !user ? setLogin(false) : setLogin(true);

        if (user) {
          global.usuario = user.email;
          global.infoUsuario = user.providerData[0];
          console.log("Información del Usuario", global.infoUsuario);
          if (!user.emailVerified) {
            console.log("Ingreso a validar si el email fue verificado");
            setVerificacionMail(false);
            setVerificacionPerfil(false);
          } else {
            setVerificacionMail(true);
            setVerificacionPerfil(false);
          }
        }
      });
    }, []);

    if (!verificacionMail) {
      return <VerificacionMail fueVerificado={setVerificacionMail} />;
    } else {
      if (!verificacionPerfil) {
        return (
          <PerfilDistribuidor
            fueLLenada={setVerificacionPerfil}
            login={setLogin}
          />
        );
      }
    }
    if (login === null) {
      return <Cargando isVisible={true} text="Cargando ..."></Cargando>;
    } else {
      return (
        <StackAuthentication.Navigator>
          {login ? (
            <StackAuthentication.Screen
              name="HomeTabScreen"
              component={ScreensFromTabs}
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
  } catch (error) {
    console.log("error", error);
  }
}

export default function NavegadorInicio() {
  return (
    <NavigationContainer>
      <AuthenticationStack></AuthenticationStack>
    </NavigationContainer>
  );
}
