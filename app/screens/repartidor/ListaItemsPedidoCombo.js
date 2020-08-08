import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  Picker,
} from "react-native";
import { Input, Avatar, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServicioPedidos } from "../../services/ServicioPedidos";
import { ItemPedidoCombo } from "./componentes/ItemPedidoCombo";
import * as colores from "../../constants/Colores";
import { estiloGlobal } from "../../styles/global/EstiloGlobal";
export class ListaItemsPedidoCombo extends Component {
  constructor(props) {
    super(props);
    this.pedidoCombo = this.props.route.params.pedidoCombo;
    this.navigation = this.props.navigation;
    let lista = [];
    this.state = {
      fecha: "",
      listaItemsPedidos: lista,
    };

    console.log("Props ListaItemsPedi", this.navigation);
  }

  componentDidMount() {
    console.log("Ingresa");
    let pedidoCombos = [];

    let srvPedido = new ServicioPedidos();
    console.log("pedido =>", this.pedidoCombo);

    srvPedido.registrarEscuchaPedidoCombo(
      this.pedidoCombo.id,
      pedidoCombos,
      this.repintarLista
    );
  }

  repintarLista = (combos) => {
    // console.log("ListaPedido", combos);

    this.setState({
      listaItemsPedidos: combos,
    });
  };

  render() {
    return (
      <View style={estiloGlobal.contenedorPagina}>
        <View style={estiloGlobal.cabecera}>
          <View style={estiloGlobal.tituloCabera}>
            <Icon
              name="chevron-left"
              size={40}
              color={colores.colorBlanco}
              style={styles.icon}
              onPress={() => {
                this.navigation.goBack();
              }}
            />
          </View>
          <Text style={textEstilo(colores.colorBlancoTexto, 20, "bold")}>
            Detalle de verificación
          </Text>
        </View>

        <View style={estiloGlobal.pie}>
          <View style={styles.titulo}>
            <Text style={styles.subtitulo}>Detalle del Pedido</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textoNegrita}>{"Factura: "}</Text>
              <Text style={{}}>{this.pedidoCombo.orden.slice(-5)}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 6,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: colores.colorOscuroPrimarioAmarillo,
            }}
          >
            <FlatList
              data={this.state.listaItemsPedidos}
              renderItem={(objeto) => {
                return (
                  <ItemPedidoCombo
                    pedidoComboItem={objeto.item}
                    idPedido={this.pedidoCombo.id}
                    empacadoPedido={this.pedidoCombo.empacado}
                  />
                );
              }}
              keyExtractor={(pedidoComboItem) => {
                return pedidoComboItem.id;
              }}
              ItemSeparatorComponent={flatListItemSeparator}
            />
          </View>
        </View>
        <View>
          <Button
            title="Observaciones"
            onPress={() => {
              this.props.navigation.navigate('ListaPaquetesPedidoScreen', { idPedido :  this.pedidoCombo.id, listaCombos: this.state.listaItemsPedidos })
            }}></Button>
        </View>
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
const flatListItemSeparator = () => {
  return (
    <View
      style={{
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colores.colorOscuroTexto,

          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cabeceraTitulo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    color: colores.colorPrimarioVerde,
  },
  tituloCabecera: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "skyblue",
    alignItems: "stretch",
    justifyContent: "center",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
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
  titulo: {
    alignItems: "center",
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
    paddingVertical: 10,
  },
  columna: {
    flex: 1,
    backgroundColor: colores.colorPrimarioVerde,
  },
  pie: {
    flex: 6,
    backgroundColor: colores.colorBlanco,
    borderTopStartRadius: 30,
    marginTop: 15,
    paddingTop: 20,
  },
  subtitulo: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 5,
  },
});
