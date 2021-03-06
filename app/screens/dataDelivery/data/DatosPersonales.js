import React, { useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import * as colores from "../../../constants/Colores";
import { Separador } from "../../../components/Separador";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export function DatosPersonales(props) {
  const separadorAltura = 5;
  return (
    <View style={styles.contenedorPagina}>
      <View style={styles.contenedorTitulo}>
        <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
          Datos Personales
        </Text>
        <View style={styles.lineaSeparador}></View>
      </View>
      <Input
        placeholder="Alejandro Fernando"
        label="Nombres"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="Perez Rosero"
        label="Apellidos"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="1700000001"
        label="Cédula  "
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="09925462512"
        label="Teléfono celular  "
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="02000100"
        label="Teléfono fijo  "
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="dd/mm/aaaa"
        label="Fecha de nacimiento"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="yappando@siempremas.com"
        label="Correo"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={separadorAltura}></Separador>
      <Input
        placeholder="masculino, femenino"
        label="Genero"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
      />
      <Separador alto={30}></Separador>
    </View>
  );
}
const textEstilo = (color, tamaño, tipo) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
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
});
