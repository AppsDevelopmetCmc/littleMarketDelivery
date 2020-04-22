import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import {
  recuperarDocumento,
  recuperarColeccion,
  crear,
  modificar,
  eliminar,
} from "../../services/ServicioCrud";
import { ItemCompras } from "./ItemCompras";

export class ListaCompras extends Component {
  
  constructor() {
    super();
    this.state = {
      imagen: "IMAGEN",
      listaProductos: [],
    };

    recuperarColeccion("productos", this.state.listaProductos, this.pintarLista);
  }

  repintar = (nombre) => {
    this.setState({ imagen: nombre });
  };

  pintarLista = (arregloProd) => {
    this.setState({ listaProductos: arregloProd });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LISTA DE COMPRAS alexa</Text>

        <Button
          title="test"
          onPress={() => {
            recuperarDocumento("productos", "Frutilla", this.repintar);
          }}
        ></Button>
        <Text>{this.state.imagen}</Text>
        <FlatList
          data={this.state.listaProductos}
          /* renderItem = {(obj) => {return <Text>Precio: {obj.item.precio}</Text>}}*/
          renderItem={(obj) => {
            return <ItemCompras product={obj.item}></ItemCompras>;
          }}
          keyExtractor={(producto) => {
            return producto.id;
          }}
        ></FlatList>

        <Button
          title="CREAR"
          onPress={() => {
            crear("productos", {
              id: "Tomate",
              precio: "18",
              imagen:
                "https://st-listas.20minutos.es/images/2011-12/311753/3275034_249px.jpg",
            });
          }}
        ></Button>
        <Button 
        title="MODIFICAR"
          onPress ={() => {
            modificar("productos", "Tomate", {
              precio: "23",
            });
          }}>
        </Button>
        <Button title="ELIMINAR"
          onPress =
          {() => {
            eliminar("productos", "Tomate");
          }}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 40,
  },
});
