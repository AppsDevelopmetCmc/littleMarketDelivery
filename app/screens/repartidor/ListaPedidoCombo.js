import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, FlatList, Picker } from "react-native";
import { Input, Avatar, CheckBox, Button } from "react-native-elements";
import { ServicioPedidos } from "../../services/ServicioPedidos";
import { ItemPedido } from "./componentes/ItemPedido";
import { formatearFechaISO } from "../../utils/DateUtil";
import * as colores from "../../constants/Colores";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Cargando from "../../components/Cargando";
import { estiloGlobal } from "../../styles/global/EstiloGlobal";

export class ListaPedidoCombo extends Component {
  constructor(props) {
    super(props);
    let lista = [];
    this.state = {
      listaPedidos: lista,
      fecha: new Date(),
      show: false,
      mostrarCargando: false,
    };
  }

  componentDidMount() {
    console.log("Ingresa");
  }

  consultarPedidoFecha = () => {
    //Alert.alert('usuario',global.usuario);
    this.setState({ mostrarCargando: true });
    let pedidos = [];
    let srvPedido = new ServicioPedidos();
    srvPedido.registrarEscuchaTodasFechaRepartidor(
      formatearFechaISO(this.state.fecha),
      global.usuario,
      pedidos,
      this.repintarLista,
      this.finalizarCargando
    );
  };

  repintarLista = (pedido) => {
    console.log("ListaPedido", pedido);
    this.setState({
      listaPedidos: pedido,
    });
  };

  finalizarCargando = (numeroCambios) => {
    console.log("Finalizando ");
    if (numeroCambios == 0) {
      this.setState({ listaPedidos: [] });
      Alert.alert(
        "Información",
        "No existen Pedidos para el asociado " +
          global.usuario +
          " en la fecha: " +
          formatearFechaISO(this.state.fecha)
      );
    }
    this.setState({ mostrarCargando: false });
  };

  pedidoCombo = (combo) => {
    this.props.navigation.navigate("ListaItemsPedidoComboScreen", {
      pedidoCombo: combo,
      navigate: this.props.navigation,
    });
  };

  onChange = (event, selectedDate) => {
    let currentDate = selectedDate || this.state.fecha;
    this.setState({ show: false });
    this.setState({ fecha: currentDate });
  };

  showDatepicker = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <View style={estiloGlobal.contenedorPagina}>
        <View style={estiloGlobal.cabecera}>
          <View style={estiloGlobal.tituloCabera}>
            <Text style={textEstilo(colores.colorBlancoTexto, 20, "bold")}>
              Verifica tu pedido Yappando
            </Text>
          </View>
        </View>
        <View style={estiloGlobal.pie}>
          <Text style={textEstilo(colores.colorOscuroTexto, 14, "normal")}>
            {"Seleccione la Fecha"}
          </Text>
          <View style={styles.date}>
            <View style={styles.fila}>
              <View style={styles.datePicker}>
                <TouchableHighlight
                  underlayColor={colores.colorClaroPrimarioVerde}
                  onPress={() => {
                    this.showDatepicker();
                  }}
                >
                  <View style={styles.contenedorFecha}>
                    <View style={styles.contenedorIcon}>
                      <Icon
                        name="calendar-month-outline"
                        size={27}
                        color="orange"
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.borderFecha}>
                      <Text style={styles.txtFecha}>
                        {formatearFechaISO(this.state.fecha)}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
                {this.state.show && (
                  <DateTimePicker
                    value={this.state.fecha}
                    mode="date"
                    display="default"
                    onChange={this.onChange}
                  />
                )}
              </View>
              <View style={styles.viewBtn}>
                <Button
                  title="Consultar"
                  buttonStyle={{
                    width: 100,
                    marginRight: 10,
                  }}
                  onPress={this.consultarPedidoFecha}
                />
              </View>
              <Cargando
                text="Buscando Pedidos..."
                isVisible={this.state.mostrarCargando}
              ></Cargando>
            </View>

            {this.state.listaPedidos.length != 0 && (
              <View style={styles.titulo}>
                <Text style={styles.textoNegrita}>
                  {"Lista de pedidos a verificar"}
                </Text>
              </View>
            )}
            <View style={styles.lista}>
              <FlatList
                data={this.state.listaPedidos}
                renderItem={(objeto) => {
                  return (
                    <ItemPedido
                      pedido={objeto.item}
                      fecha={formatearFechaISO(this.state.fecha)}
                      fnpPedidoCombo={this.pedidoCombo}
                    />
                  );
                }}
                keyExtractor={(objetoPedido) => {
                  return objetoPedido.id;
                }}
                ItemSeparatorComponent={flatListItemSeparator}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
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

const textEstilo = (color, tamaño, tipo) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
  };
};

const styles = StyleSheet.create({
  titulo: {
    flex: 1,
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    borderTopLeftRadius: 2,
    borderTopEndRadius: 2,
    marginTop: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "skyblue",
    alignItems: "stretch",
    justifyContent: "center",
  },
  cabeceraTitulo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    //backgroundColor: 'red',
  },
  columna: {
    flex: 1,
    backgroundColor: colores.colorPrimarioVerde,
  },
  fila: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colores.colorOscuroPrimarioAmarillo,
    borderRadius: 8,
    paddingVertical: 10,
  },
  date: {
    flex: 1,
  },
  datePicker: {
    flex: 1,
  },
  lista: {
    flex: 12,
    paddingVertical: 15,
    marginLeft: 10,
    borderTopStartRadius: 30,
  },
  viewBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  textoNegrita: {
    marginTop: 0,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  textoNegritaBlanco: {
    marginTop: 0,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },

  texto: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 10,
  },
  textoNegritaSubrayado: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 0,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  pie: {
    flex: 6,
    backgroundColor: colores.colorBlanco,
    borderTopStartRadius: 30,
    marginTop: 15,
    paddingTop: 20,
  },

  icon: {
    marginRight: 10,
  },
  contenedorFecha: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  borderFecha: {
    flex: 3,
    borderWidth: 1,
    alignItems: "center",
  },
  txtFecha: {
    marginTop: 5,
    marginBottom: 5,
  },
  contenedorIcon: {
    flex: 1,
    color: "white",
  },
  tituloCabecera: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
