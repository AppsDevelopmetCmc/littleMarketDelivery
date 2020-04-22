import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { Avatar } from "react-native-elements";

export class ItemCompras extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagenes}>
          <Avatar source={{ uri: this.props.product.imagen }}></Avatar>
        </View>
        <View style={styles.fila}>
          <Text> {this.props.product.id}</Text>
          <Text> {this.props.product.precio}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#20232a",
    //borderRadius: 6,
    ///backgroundColor: "#61dafb",
    color: "#20232a",
    marginTop: 10,
  },
  fila: {
    flex: 6,
    flexDirection: "row",
    backgroundColor: "#FF5733",
    alignItems: "center", // alinea verticalmente
    justifyContent: "center", // alinea horizontalmente
  },
  imagenes: {
    flex: 2,
    backgroundColor: "#46160C",
  },
});
