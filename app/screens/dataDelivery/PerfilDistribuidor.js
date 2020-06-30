import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import * as colores from "../../constants/Colores";
import { Separador } from "../../components/Separador";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { DatosPersonales } from "./data/DatosPersonales";
import { DatosVehiculo } from "./data/DatosVehiculo";
import { DatosImagenes } from "./data/DatosImagenes";
import { DatosTerminos } from "./data/DatosTerminos";

export function PerfilDistribuidor(props) {
  console.log("props de PerfilDistribuidor", props);
  const [progreso, setProgreso] = useState(0);
  const [itemNavegacion, setItemNavegacion] = useState(0);
  const { setVerificacionPerfil } = props;
  const separadorAltura = 10;
  const totalPantallas = 4;

  useEffect(() => {
    console.log("ingreso al use effect");

    setProgreso(25);
    setItemNavegacion(1);
  }, []);

  const adelantarPantallas = () => {
    console.log("itemNavegacion", itemNavegacion);

    let adelante = itemNavegacion + 1;
    setItemNavegacion(adelante);
    if (adelante > totalPantallas) {
      setVerificacionPerfil(true);
    }
    if (adelante == 1) {
      setProgreso(25);
    }
    if (adelante == 2) {
      setProgreso(50);
    }
    if (adelante == 3) {
      setProgreso(75);
    }
    if (adelante == 4) {
      setProgreso(100);
    }
  };
  const retrasarPantallas = () => {
    console.log("itemNavegacion", itemNavegacion);

    let adelante = itemNavegacion - 1;
    setItemNavegacion(adelante);
    if (adelante < 0) {
      setProgreso(25);
      setItemNavegacion(1);
    }
    if (adelante == 1) {
      setProgreso(25);
    }
    if (adelante == 2) {
      setProgreso(50);
    }
    if (adelante == 3) {
      setProgreso(75);
    }
    if (adelante == 4) {
      setProgreso(100);
    }
  };

  return (
    <SafeAreaView style={styles.contenedorPagina}>
      <View style={styles.cabecera}>
        <View>
          <Text style={textEstilo(colores.colorBlancoTexto, 15, "bold")}>
            {"Formulario de \nRegistro"}
          </Text>
          <Text style={textEstilo(colores.colorBlancoTexto, 22, "bold")}>
            Yappando
          </Text>
        </View>

        <AnimatedCircularProgress
          size={65}
          width={8}
          fill={progreso}
          tintColor={colores.colorPrimarioTomate}
          onAnimationComplete={() => console.log("se ejecuto")}
          backgroundColor={colores.colorBlanco}
        >
          {() => <Text>{progreso}</Text>}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.pie}>
        <ScrollView>
          {itemNavegacion == 1 ? (
            <DatosPersonales></DatosPersonales>
          ) : itemNavegacion == 2 ? (
            <DatosVehiculo></DatosVehiculo>
          ) : itemNavegacion == 3 ? (
            <DatosImagenes></DatosImagenes>
          ) : (
            <DatosTerminos></DatosTerminos>
          )}
        </ScrollView>
      </View>
      <View>
        {itemNavegacion == 1 ? (
          <Button
            title={"Siguiente"}
            onPress={() => {
              console.log("ingreso al boton");
              adelantarPantallas();
            }}
          ></Button>
        ) : (
          <View style={styles.contenedorBotones}>
            <Button
              title={"Atras"}
              containerStyle={styles.containerStyleButton}
              onPress={() => {
                console.log("ingreso al boton");
                retrasarPantallas();
              }}
            ></Button>
            <Button
              title={"Siguiente"}
              containerStyle={styles.containerStyleButton}
              onPress={() => {
                console.log("ingreso al boton");
                adelantarPantallas();
              }}
            ></Button>
          </View>
        )}
      </View>
    </SafeAreaView>
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: colores.colorPrimarioVerde,
  },
  cabecera: {
    backgroundColor: colores.colorPrimarioVerde,
    paddingHorizontal: 25,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  pie: {
    flex: 4,
    backgroundColor: "#F7F8E2",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingHorizontal: 15,
    marginTop: 30,
    paddingTop: 20,
  },
  contenedorTitulo: { paddingHorizontal: 10, alignItems: "center" },
  estiloInputContenedor: {
    padding: 0,
    marginTop: 0,
  },
  estiloInput: { fontSize: 14 },
  btnStyles: {
    marginTop: 50,
    width: "100%",
    height: 40,
  },
  lineaSeparador: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: colores.colorOscuroPrimario,
    marginBottom: 15,
    paddingVertical: 5,
  },
  contenedorBotones: { flexDirection: "row" },
  containerStyleButton: { width: "50%" },
});
