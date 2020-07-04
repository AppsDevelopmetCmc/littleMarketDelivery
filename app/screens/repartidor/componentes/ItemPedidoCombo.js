import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertir } from "../../../utils/ConvertidorUnidades";
import * as colores from "../../../constants/Colores";
import { ServicioPedidos } from "../../../services/ServicioPedidos";

export class ItemPedidoCombo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.pedidoComboItem.recibido,
      colorImportante: this.props.pedidoComboItem.nombre.includes("YAPA")
        ? "red"
        : colores.colorOscuroTexto,
    };
  }

  actualizarRecibidoCombo = (recibido) => {
    console.log(this.props.pedidoComboItem);
    console.log(this.props.idPedido);
    let srvPedidos = new ServicioPedidos();
    srvPedidos.actualizarRecibidoPC(this.props.idPedido, {
      id: this.props.pedidoComboItem.id,
      recibido: recibido,
    });
  };

  render() {
    return (
      <View style={this.state.checked ? styles.filaSeleccionada : styles.fila}>
        <View style={{ flex: 2 }}>
          <Text style={textEstilo(this.state.colorImportante, 15, "bold")}>
            {this.props.pedidoComboItem.nombre}
          </Text>
          <Text style={textEstilo(this.state.colorImportante, 15, "bold")}>
            {convertir(
              this.props.pedidoComboItem.unidad,
              this.props.pedidoComboItem.cantidadItem
            )}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            fontWeight: "bold",
            fontSize: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {this.props.pedidoComboItem.cantidad}
          </Text>
        </View>
        {!this.props.pedidoComboItem.nombre.includes("YAPA") ? (
          <View style={{ flex: 1, marginRight: 20 }}>
            <CheckBox
              checked={this.state.checked}
              onPress={() => {
                if (!this.state.checked) {
                  this.actualizarRecibidoCombo(true);
                } else {
                  this.actualizarRecibidoCombo(false);
                }

                this.setState({ checked: !this.state.checked });
              }}
              checkedColor={colores.colorOscuroPrimarioTomate}
              size={22}
              uncheckedColor={colores.colorOscuroPrimario}
            ></CheckBox>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon name="alert-circle" color="red" size={28} />
          </View>
        )}
      </View>
    );
  }
}

const textEstilo = (color, tamaño, tipo) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
  };
};

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: "100%",
  },
  subContenido: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    //backgroundColor: '#fff',
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 200,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button_item: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "orange",
    marginVertical: 5,
    marginRight: 2,
  },
  fila: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  touch: {
    flex: 3,
  },
  contenedorDescripcion: { flex: 1 },
  texto: {
    fontSize: 13,
    textAlign: "left",
    //fontWeight: 'bold',
    marginLeft: 10,
  },
  textoNegrita: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: 10,
  },
  contenedorEliminar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "orange",
  },
  estiloBotonEliminar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "orange",
    marginVertical: 5,
    marginRight: 2,
  },
  filaSeleccionada: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    marginTop: 2,
    paddingLeft: 10,
  },
});
