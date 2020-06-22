import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { colorOscuroTexto, colorPrimarioVerde } from "../../constants/Colores";

export function PerfilDistribuidor(props) {
  console.log("props de PerfilDistribuidor", props);
  const { fueLLenada } = props;

  return (
    <View style={styles.contenedorPagina}>
      <ScrollView>
        <Input placeholder="Primer Nombre" label="Primer Nombre * " />
        <Input placeholder="Segundo Nombre" label="Segundo Nombre * " />
        <Input placeholder="Primer Apellido" label="Primer Apellido * " />
        <Input placeholder="Segundo Apellido" label="Segundo Apellido * " />
        <Input placeholder="1478523691" label="Cedula * " />
        <Input placeholder="09925462512" label="Telefono Celular * " />
        <Input placeholder="022784596" label="Telefono Fijo * " />
        <Input
          placeholder="Camioneta, automovil, furgoneta"
          label="Tipo vehiculo * "
        />
        <Input placeholder="Matricula" label="Matricula * " />
        <Input placeholder="Profesional, sportman" label="Tipo Licencia * " />
        <CheckBox
          title="Verifica que su información es veridica y consiente a yappando la verificación de la misma"
          checked={false}
        />
      </ScrollView>
      <Button
        title={"Continuar"}
        onPress={() => {
          fueLLenada(true);
        }}
      ></Button>
    </View>
  );
}

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
  contenedorPagina: {
    flex: 1,
    marginTop: 40,
  },
});
