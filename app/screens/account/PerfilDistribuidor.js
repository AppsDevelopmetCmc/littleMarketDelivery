import React from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import * as colores from "../../constants/Colores";
import { Separador } from "../../components/Separador";

export function PerfilDistribuidor(props) {
  console.log("props de PerfilDistribuidor", props);
  const { fueLLenada } = props;
  const separadorAltura = 10;

  return (
    <SafeAreaView style={styles.contenedorPagina}>
      <View style={styles.cabecera}>
        <Text style={textEstilo(colores.colorBlancoTexto, 20, "bold")}>
          Formulario de Registro
        </Text>
      </View>
      <View style={styles.pie}>
        <ScrollView>
          <View style={styles.contenedorTitulo}>
            <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
              Datos Personales
            </Text>
            <View style={styles.lineaSeparador}></View>
          </View>
          <Input
            placeholder="Primer Nombre"
            label="Primer Nombre * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="Segundo Nombre"
            label="Segundo Nombre * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="Primer Apellido"
            label="Primer Apellido * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="Segundo Apellido"
            label="Segundo Apellido * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="1478523691"
            label="Cedula * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="09925462512"
            label="Telefono Celular * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="022784596"
            label="Telefono Fijo * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={30}></Separador>
          <View style={styles.contenedorTitulo}>
            <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
              Datos Vehículo
            </Text>
            <View style={styles.lineaSeparador}></View>
          </View>
          <Input
            placeholder="Camioneta, automovil, furgoneta"
            label="Tipo vehiculo * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="Matricula"
            label="Matricula * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={separadorAltura}></Separador>
          <Input
            placeholder="Profesional, sportman"
            label="Tipo Licencia * "
            inputStyle={styles.estiloInput}
            labelStyle={textEstilo(colores.colorOscuroTexto, 14, "normal")}
          />
          <Separador alto={30}></Separador>
        </ScrollView>
      </View>
      <CheckBox
        title="Verifica que su información es veridica y consiente a yappando la verificación de la misma"
        checked={false}
      />
      <Button
        title={"Continuar"}
        onPress={() => {
          fueLLenada(true);
        }}
      ></Button>
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
});
