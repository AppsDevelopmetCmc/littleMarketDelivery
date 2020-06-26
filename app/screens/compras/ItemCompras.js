import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { modificarColeccion } from "../../services/ServicioCrud";

export class ItemCompras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.compras.estado,
    };
  }

  actualizarEstado = () => {
    this.setState({ checked: !this.state.checked });
    console.log("ESTADO" + this.state.checked);
    modificarColeccion(
      "compras",
      "zantycb89@gmail.com",
      "productos",
      this.props.compras.id,
      { estado: !this.state.checked }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.columna1}>
          <CheckBox
            title=" "
            checked={this.state.checked}
            onPress={this.actualizarEstado}
            style={styles.check}
          />
        </View>
        <View style={styles.columna2}>
          <Text> {this.props.compras.cantidad}</Text>
        </View>
        <View style={styles.columna3}>
          <Text> {this.props.compras.unidad}</Text>
        </View>
        <View style={styles.columna4}>
          <Text> {this.props.compras.id}</Text>
        </View>
        <View style={styles.columna5}>
          <Text> {this.props.compras.precio}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#20232a",
    borderBottomWidth: 1,
    color: "#20232a",
    //marginTop: 10,
    alignItems: "center", // alinea verticalmente
    //backgroundColor: "#FF5733",
    marginLeft: 10,
    marginRight: 10,

    justifyContent: "center",
  },
  columna1: {
    flex: 1,
    //backgroundColor: "green",
    justifyContent: "center",
  },
  columna2: {
    flex: 1.2,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center", // alinea verticalmente
  },
  columna3: {
    flex: 1.5,
    //backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center", // alinea verticalmente
  },
  columna4: {
    flex: 2,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center", // alinea verticalmente
  },
  columna5: {
    flex: 1,
    //backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end", // alinea verticalmente
  },
  check: {
    backgroundColor: "green",
  },
});
