import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { estiloGlobal } from "../../styles/global/EstiloGlobal";
import * as firebase from "firebase";
import {
  colorBlanco,
  colorClaroPrimario,
  colorClaroPrimarioTomate,
  colorClaroPrimarioVerde,
  colorClaroPrimarioAmarillo,
  colorPrimarioTomate,
  colorOscuroPrimarioVerde,
  colorOscuroTexto,
  colorBlancoTexto,
} from "../../constants/Colores";

export class ListaPedidos extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={estiloGlobal.contenedorPagina}>
        <View style={estiloGlobal.cabecera}>
          <View style={estiloGlobal.tituloCabera}>
            <Text style={textEstilo(colorBlancoTexto, 20, "bold")}>
              Mis pedidos
            </Text>
          </View>
        </View>
        <View style={estiloGlobal.pie}>
          <View style={styles.detallePie}>
            <Button
              title="Listar pedidos"
              onPress={() => {
                navigation.navigate("Mapa", {
                  jornada: "M",
                });
              }}
            ></Button>
            <View style={{ paddingTop: 150 }}>
              <Button
                title="Cerrar Sesión"
                onPress={() => {
                  firebase.auth().signOut();
                  console.log("Se cerro sesion");
                }}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const textEstilo = (color, tamaño, tipo) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
  };
};
const styles = StyleSheet.create({
  detallePie: { flex: 1, justifyContent: "center" },
});
