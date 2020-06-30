import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export class ItemResumenPedido extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.columna1}>
          <Text>{this.props.combos.cantidadItem}</Text>
        </View>
        <View style={styles.columna2}>
          <Text> {this.props.combos.unidad}</Text>
        </View>
        <View style={styles.columna3}>
          <Text> {this.props.combos.nombre}</Text>
        </View>
        <View style={styles.columna4}>
          <Text> {this.props.combos.cantidad}</Text>
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
    alignItems: "center",
  },
  columna2: {
    flex: 1.5,
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
    flex: 1.5,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center", // alinea verticalmente
  },
});
