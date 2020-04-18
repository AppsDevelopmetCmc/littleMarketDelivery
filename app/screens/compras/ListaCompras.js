import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";
export class ListaCompras extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LISTA DE COMPRAS</Text>
        <Button
          title="Cerrar Sesión"
          onPress={() => {
            firebase.auth().signOut();
            console.log("Se cerro sesion");
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
