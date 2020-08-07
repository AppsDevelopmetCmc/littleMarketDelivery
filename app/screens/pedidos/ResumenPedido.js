import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

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
      paquetes: [],
    };
    coleccionDeColeccion(
      "pedidos",
      this.direccion.key,
      "paquetes",
      this.pintarDetalle
    );
    recuperarDocumento("pedidos", this.direccion.key, this.repintarCabecera);
  }

  repintarCabecera = (datosPedido) => {
    this.setState({ detalle: datosPedido });
  };

  pintarDetalle = (paquetes) => {
    this.setState({ paquetes: paquetes });
  };

  finalizarCobro = () => {};

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Cliente : {this.state.detalle.nombreCliente}</Text>
          <Text>Teléfono : {this.state.detalle.telefono}</Text>
          <Text>Direccion: {this.state.detalle.direccion}</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Método de Pago: {this.state.detalle.formaPago}
          </Text>
        </View>
        <View style={[styles.container, { marginVertical:15 }]}>
          <Text style={{ fontWeight: "bold" }}>DETALLE DEL PEDIDO</Text>
        </View>
        <View>
          <FlatList
            data={this.state.paquetes}
            renderItem={(obj) => {
              return <ItemResumenPedido paquetes={obj.item}></ItemResumenPedido>;
            }}
            keyExtractor={(paquetes) => {
              return paquetes.id;
            }}
          ></FlatList>
        </View>
        <View>
          <Button
            title="FINALIZAR ENTREGA"
            onPress={() => {
              modificarDocumento("pedidos", this.direccion.key, {
                estado: "PE",
              });
              navigation.navigate("Mapa", { jornada: this.jornada });
            }}
          ></Button>
        </View>
      </ScrollView>
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
