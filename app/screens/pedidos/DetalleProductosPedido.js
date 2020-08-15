import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView,
} from "react-native";

import {
    recuperarDocumento,
    coleccionDeColeccion,
    modificarDocumento,
} from "../../services/ServicioCrud";

export class DetalleProductosPedido extends Component {
    constructor(props) {
        super(props);
        this.jornada = this.props.route.params.jornada;
        this.direccion = this.props.route.params.direccion;
        this.state = {
            detalle: {},
            productos: [],
        };
        coleccionDeColeccion(
            "pedidos",
            this.direccion.key,
            "combos",
            this.pintarDetalle
        );
        recuperarDocumento("pedidos", this.direccion.key, this.repintarCabecera);
    }

    repintarCabecera = (datosPedido) => {
        this.setState({ detalle: datosPedido });
    };

    pintarDetalle = (productos) => {
        this.setState({ productos: productos });
    };

    finalizarCobro = () => { };

    render() {
        return (
            <ScrollView>
                <View style={[styles.container, { marginVertical: 15 }]}>
                    <Text style={{ fontWeight: "bold" }}>PRODUCTOS DEL PEDIDO</Text>
                </View>
                <View style={styles.fila}>
                    <View style={styles.columna1}>
                        <Text> Cantidad </Text>
                    </View>
                    <View style={styles.columna2}>
                        <Text> Unidades </Text>
                    </View>
                    <View style={styles.columna3}>
                        <Text> Nombre</Text>
                    </View>
                    <View style={styles.columna4}>
                        <Text> Paquetes</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={this.state.productos}
                        renderItem={(obj) => {
                            return <ItemProductosPedido productos={obj.item}></ItemProductosPedido>;
                        }}
                        keyExtractor={(productos) => {
                            return productos.id;
                        }}
                    ></FlatList>
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
