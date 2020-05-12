import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export class ListaPedidos extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>LISTA DE PEDIDOS</Text>
        <Button title='PEDIDOS MAÑANA'
               onPress={() => {
                navigation.navigate('Mapa', {
                  origen: 'tarde',
               });
               }}
        ></Button>
        <Button
        title='PEDIDOS TARDE'
        onPress={() => {
          navigation.navigate('Mapa', {
            origen: 'tarde',
         });
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
