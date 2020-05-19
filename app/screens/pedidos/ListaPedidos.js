import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as firebase from 'firebase';

export class ListaPedidos extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>LISTA DE PEDIDOS</Text>
        <Button title='PEDIDOS MAÑANA'
               onPress={() => {
                navigation.navigate('Mapa', {
                  jornada: 'M',
               });
               }}
        ></Button>
        <Button
        title='PEDIDOS TARDE'
        onPress={() => {
          navigation.navigate('Mapa', {
            jornada: 'T',
         });
        }}
        ></Button>
        <Button
               title="Cerrar Sesión"
               onPress={() => {
                  firebase.auth().signOut();
                  console.log('Se cerro sesion');
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
