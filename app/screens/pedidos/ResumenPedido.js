import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  recuperarDocumento,
  coleccionDeColeccion,
  modificarDocumento,
} from "../../services/ServicioCrud";
import { ItemResumenPedido } from "./ItemResumenPedido";

export class ResumenPedido extends Component {
  constructor(props) {
    super(props);
    this.jornada = this.props.route.params.jornada;
    this.direccion = this.props.route.params.direccion;
    this.state = {
      detalle: {},
      combos: []
    };
    coleccionDeColeccion(
      "pedidos",
      this.direccion.key,
      "combos",
      this.pintarDetalle
    );
    recuperarDocumento(
      "pedidos",
      this.direccion.key,
      this.repintarCabecera
    );
  }

  repintarCabecera = (datosPedido) => {
    this.setState({ detalle: datosPedido });
  };

  pintarDetalle = (combos) => {
    this.setState({ combos: combos });
  };

  finalizarCobro = () => {};

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Cliente : {this.state.detalle.nombreCliente}</Text>
          <Text>Teléfono : {this.state.detalle.telefono}</Text>
          <Text>Direccion: {this.state.detalle.direccion}</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Método de Pago: {this.state.detalle.formaPago}
          </Text>
        </View>
        <View style={[styles.container, { marginTop: 15 }]}>
          <Text style={{ fontWeight: "bold" }}>DETALLE DEL PEDIDO</Text>
        </View>

        <View style={styles.fila}>
          <View style={styles.columna1}>
            <Text> Cantidad </Text>
          </View>
          <View style={styles.columna2}>
            <Text> Producto </Text>
          </View>
          <View style={styles.columna3}>
            <Text> Precio U.</Text>
          </View>
          <View style={styles.columna4}>
            <Text> Total</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={this.state.combos}
            renderItem={(obj) => {
              return <ItemResumenPedido combos={obj.item}></ItemResumenPedido>;
            }}
            keyExtractor={(combos) => {
              return combos.id;
            }}
          ></FlatList>
        </View>

        <View style={styles.fila}>
          <View style={styles.columna1}>
            <Text> </Text>
          </View>
          <View style={styles.columna2}>
            <Text> </Text>
          </View>
          <View style={styles.columna3}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Total</Text>
          </View>
          <View style={styles.columna4}>
            <Text> ${this.state.detalle.total}</Text>
          </View>
        </View>
        <View>
          <Button
            title="Confirmar Entrega"
            onPress={() => {
              modificarDocumento("pedidos", this.direccion.key, {
                estado: "PE",
              });
              navigation.navigate("Mapa",{jornada: this.jornada});
            }}
          ></Button>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //marginTop: 10,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  fila: {
    flexDirection: "row",
    borderColor: "#20232a",
    borderBottomWidth: 1,
    color: "#20232a",
    //backgroundColor: "#FF5733",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  columna1: {
    flex: 1,
    //backgroundColor: "green",
    alignItems: "center",
  },
  columna2: {
    flex: 1.5,
    //backgroundColor: "blue",
    alignItems: "center",
  },
  columna3: {
    flex: 1.5,
    //backgroundColor: "yellow",
    alignItems: "center",
  },
  columna4: {
    flex: 1.5,
    //backgroundColor: "white",
    alignItems: "center",
  },
});
