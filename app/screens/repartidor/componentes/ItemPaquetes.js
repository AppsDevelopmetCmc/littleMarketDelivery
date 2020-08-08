import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertir } from "../../../utils/ConvertidorUnidades";
import * as colores from "../../../constants/Colores";
import { ServicioPedidos } from "../../../services/ServicioPedidos";

export class ItemPaquetes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            cantidad: this.props.paquete.cantidad,
        };
    }

    render() {
        return (
            <View >
                {this.props.paquete.editable ? (
                    <View style={styles.container}>
                        <View
                            style={styles.columna1}>
                            <Text>{this.props.paquete.descripcion}</Text>
                        </View>
                        <View
                            style={styles.columna2}>
                            <Button
                                buttonStyle={styles.botonModificar}
                                onPress={() => {
                                    let nuevaCantidad =
                                        parseInt(this.state.cantidad) - 1;
                                    if (nuevaCantidad >= 0) {
                                        this.setState({ cantidad: nuevaCantidad });
                                        this.props.paquete.cantidad = nuevaCantidad;
                                    }
                                }}
                                icon={
                                    <Icon name="minus-circle" size={18} color="white" />
                                }
                            />
                            <Text style={{ marginHorizontal: 15 }}
                            >
                                <Text>{this.state.cantidad}</Text>
                            </Text>
                            <Button
                                buttonStyle={styles.botonModificar}
                                onPress={() => {
                                    let nuevaCantidad =
                                        parseInt(this.state.cantidad) + 1;
                                    if (nuevaCantidad < 100) {
                                        this.setState({ cantidad: nuevaCantidad });
                                        this.props.paquete.cantidad = nuevaCantidad;
                                    }
                                }}
                                icon={
                                    <Icon name="plus-circle" size={18} color="white" />
                                }
                            />
                        </View>
                    </View>) : <View style={styles.container}>
                        <View style={styles.columna1}><Text>{this.props.paquete.descripcion}</Text></View>
                        <View style={styles.columna2}><Text>{this.props.paquete.cantidad}</Text></View></View>}

            </View>
        )
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
    container: {
        flex: 1,
        flexDirection: "row",
        borderColor: "#20232a",
        borderBottomWidth: 1,
        color: "#20232a",
        //marginTop: 10,
        alignItems: "center", // alinea verticalmente
        //backgroundColor: "#FF5733",
        marginLeft: 10,
        marginRight: 10,

        justifyContent: "center",
    },
    columna1: {
        flex: 1,
        //backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
    },
    columna2: {
        flex: 1.5,
        // backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", // alinea verticalmente
        marginVertical: 5
    },
    boton: {
        //paddingVertical: 5,
        //marginRight: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    botonModificar: {
        backgroundColor: colores.colorPrimarioVerde,
    },
    fila: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colores.colorBlanco,
        marginTop: 2,

        borderBottomColor: colores.colorPrimarioVerde,
        borderBottomWidth: 1,

        // marginLeft: 15,
        // borderBottomLeftRadius: 6,
        // borderTopLeftRadius: 6,
    },
    filaSeleccionada: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colores.colorPrimarioAmarilloRgba,
        marginTop: 2,
        // marginLeft: 15,
        //      borderBottomLeftRadius: 6,
        //    borderTopLeftRadius: 6,
        borderBottomColor: colores.colorPrimarioVerde,
        borderBottomWidth: 1,
    },
    imagenes: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    informacion: {
        flex: 8,
        flexDirection: 'column',
        marginBottom: 5,
    },
    descripcion: {
        flex: 1,
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
    },

    filaFlexEnd: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contenido: {
        flex: 5,
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    checked: {
        flex: 1,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //paddingBottom: 24.5,
    },

    textoNegrita: {
        marginTop: 0,
        marginLeft: 10,
    },
    texto: {
        fontSize: 15,
        marginTop: 0,
        marginLeft: 10,
    },
    textoNegritaSubrayado: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    /*colorLinea: {
       backgroundColor: colores.colorPrimarioTomate,
       width: 5,
       borderTopStartRadius: borderLinea,
       borderBottomStartRadius: borderLinea,
    },*/
});
