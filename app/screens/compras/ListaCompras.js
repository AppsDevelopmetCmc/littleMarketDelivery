import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import {
  coleccionDeColeccion,
  recuperarDocumento,
} from "../../services/ServicioCrud";
import { ItemCompras } from "./ItemCompras";
import { SafeAreaView } from "react-native-safe-area-context";

export class ListaCompras extends Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      fecha: "",
      correo: "",
      totalCompras: 0,
    };
    coleccionDeColeccion(
      "compras",
      "zantycb89@gmail.com",
      "productos",
      this.pintarListaProductos
    );
    recuperarDocumento("compras", "zantycb89@gmail.com", this.repintarCabecera);
  }

  repintarCabecera = (datosCompras) => {
    this.setState({ fecha: datosCompras.fecha });
    this.setState({ correo: datosCompras.id });
  };

  pintarListaProductos = (productos) => {
    this.setState({ productos: productos });
    this.calculaTotal();
  };

  calculaTotal = () => {
    var total = 0;
    this.state.productos.forEach((producto) => {
      total += producto.estado ? Number(producto.precio) : 0;
    });
    this.setState({ totalCompras: total });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
            <View>
              <Text>Fecha de Compra: {this.state.fecha}</Text>
            </View>
            <View>
              <Text>Asociado: {this.state.correo}</Text>
            </View>
          </View>

          <View style={styles.fila}>
            <View style={styles.columna1}></View>
            <View style={styles.columna2}>
              <Text> Cantidad </Text>
            </View>
            <View style={styles.columna3}>
              <Text> Unidad</Text>
            </View>
            <View style={styles.columna4}>
              <Text> Producto</Text>
            </View>
            <View style={styles.columna5}>
              <Text> Precio</Text>
            </View>
          </View>
          <FlatList
            data={this.state.productos}
            renderItem={(obj) => {
              return <ItemCompras compras={obj.item}></ItemCompras>;
            }}
            keyExtractor={(compras) => {
              return compras.id;
            }}
          ></FlatList>

        <View style={styles.fila}>
          <View style={styles.columna1}>
            <Text> </Text>
          </View>
          <View style={styles.columna2}>
            <Text> </Text>
          </View>
          <View style={styles.columna3}>
            <Text></Text>
          </View>
          <View style={styles.columna4}>
            <Text style={{ fontWeight: 'bold',fontSize:15}}> Total</Text>
          </View>
          <View style={styles.columna5}>
            <Text> ${this.state.totalCompras}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    // marginTop: 10,
    // marginBottom:10,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
    flex: 1.2,
    //backgroundColor: "blue",
    alignItems: "center",
  },
  columna3: {
    flex: 1.5,
    //backgroundColor: "yellow",
    alignItems: "center",
  },
  columna4: {
    flex: 2,
    //backgroundColor: "white",
    alignItems: "center",
  },
  columna5: {
    flex: 1,
    //backgroundColor: "green",
    alignItems: "center",
  },
});
