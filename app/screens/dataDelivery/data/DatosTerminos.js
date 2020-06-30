import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, Input, CheckBox, Image } from "react-native-elements";
import * as colores from "../../../constants/Colores";
import { Separador } from "../../../components/Separador";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export function DatosTerminos(props) {
  const separadorAltura = 5;
  const imagen = "../../";
  return (
    <View style={styles.contenedorPagina}>
      <View style={styles.contenedorTitulo}>
        <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
          Terminos y Condiciones
        </Text>
        <View style={styles.lineaSeparador}></View>
        <View style={styles.contenedorTerminos}>
          <Text>
            Yappando garantiza que la información personal que usted envía
            cuenta con la seguridad necesaria. Los datos ingresados por usuario
            o en el caso de requerir una validación de los pedidos no serán
            entregados a terceros, salvo que deba ser revelada en cumplimiento a
            una orden judicial o requerimientos legales. La suscripción a
            boletines de correos electrónicos publicitarios es voluntaria y
            podría ser seleccionada al momento de crear su cuenta. Yappando
            reserva los derechos de cambiar o de modificar estos términos sin
            previo aviso
          </Text>
          <CheckBox
            title="Conciente a yappando la verificación de los datos enviados"
            checked={false}
          />
        </View>
      </View>
    </View>
  );
}
const textEstilo = (color, tamaño, tipo, alineacion) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
    textAlign: alineacion,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: colores.colorOscuroTexto,
    fontWeight: "bold",
    fontSize: 18,
  },
  textNormal: {
    color: colores.colorOscuroTexto,
    fontWeight: "normal",
    paddingVertical: 5,
    fontSize: 15,
  },
  textNegrita: {
    color: colores.colorOscuroTexto,
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 5,
  },
  contenedorPagina: {
    flex: 1,
  },
  cabecera: {
    backgroundColor: colores.colorPrimarioVerde,
    paddingHorizontal: 40,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pie: {
    flex: 4,
    backgroundColor: colores.colorBlanco,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingHorizontal: 15,
    marginTop: 30,
    paddingTop: 20,
  },
  contenedorTitulo: { paddingHorizontal: 10 },
  inputStyleContenedor: {
    padding: 0,
    marginTop: 0,
  },
  inputStyle: {
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: colores.colorBlancoTexto,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#E0DEC1",
  },
  btnStyles: {
    marginTop: 50,
    width: "100%",
    height: 40,
  },
  lineaSeparador: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#E0DEC1",
    marginBottom: 15,
    paddingVertical: 5,
  },
  containerStyle: {
    marginVertical: 2,
  },
  inputContainerStyle: { borderColor: "#F7F8E2" },
  contenedorImagenNombre: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorDosImg: { flexDirection: "row" },
  contenedorTerminos: {
    backgroundColor: colores.colorBlanco,
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.colorCremaOscuro,
  },
});
