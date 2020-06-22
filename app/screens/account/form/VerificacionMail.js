import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { colorOscuroTexto } from "../../../constants/Colores";

export function VerificacionMail(props) {
  console.log("props de VerificacionMail", props);
  const { fueVerificado } = props;
  return (
    <View style={styles.safeAreaView}>
      <Text style={styles.textTitulo}>Bienvenido a Yappando Delivery</Text>
      <Text style={styles.textNormal}>
        No has verificado tu correo electrónico
      </Text>
      <Text style={styles.textNormal}>{global.usuario}</Text>
      <Text style={styles.textNormal}>
        Para activar tu cuenta ingresa a tu correo y selecciona el link de
        verificación
      </Text>
      <Text style={styles.textNormal}>
        Si no esta en tu sección de correos, por favor buscarlo en correos no
        deseados
      </Text>
      <Button
        title={"Continuar"}
        containerStyle={{ marginTop: 40 }}
        onPress={() => {
          console.log("Ingreso a la pantalla de validacion");
          fueVerificado(true);
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  textTitulo: {
    color: colorOscuroTexto,
    fontWeight: "bold",
    fontSize: 18,
  },
  textNormal: {
    color: colorOscuroTexto,
    fontWeight: "normal",
    paddingVertical: 5,
    fontSize: 15,
  },
  textNegrita: {
    color: colorOscuroTexto,
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 5,
  },
});
