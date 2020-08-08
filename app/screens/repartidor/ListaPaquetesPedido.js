import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Picker,
    TextInput
} from "react-native";
import { Input, Avatar, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServicioPedidos } from "../../services/ServicioPedidos";
import { ItemPedidoCombo } from "./componentes/ItemPedidoCombo";
import * as colores from "../../constants/Colores";
import { estiloGlobal } from "../../styles/global/EstiloGlobal";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemPaquetes } from "./componentes/ItemPaquetes";
export class ListaPaquetesPedido extends Component {

    constructor(props) {
        super(props);
        this.idPedido = this.props.route.params.idPedido;
        this.combos = this.props.route.params.listaCombos;
        let lista = [];
        this.cubetas = 0;
        this.papaGruesa = 0;
        this.papaMediana = 0;
        this.naranja = 0;
        this.state = {
            checked: false,
            cantidad: 0,
            listaPaquetesPedido: lista,
            observacion:""
        };
    }

    componentDidMount() {
        console.log("Ingresa ListaPaquetes");
        let paquetePedidos = [];
        let srvPedido = new ServicioPedidos();
        srvPedido.obtenenerPaquetes(
            this.idPedido,
            paquetePedidos,
            this.pintarPaquetes
        );
        this.cantidadesProd();
    }
    pintarPaquetes = (paquetes) => {
        console.log("*****PINTAR PAQUETES*****" + JSON.stringify(paquetes))
        this.setState({ listaPaquetesPedido: paquetes });
    }

    cantidadesProd = () => {
        console.log("****COMBOS PAQUETES*****" + this.combos.length);
        for (var i = 0; i < this.combos.length; i++) {
            console.log("*****PRODUCTO******" + this.combos[i].id);
            if (this.combos[i].id == "oxG2RyrBmsJTDNUILwFV") {
                //huevos
                console.log("*****HUEVOS******" + this.combos[i].cantidad);
                this.cubetas = this.combos[i].cantidad;
            } else if (this.combos[i].id == '7KwZRAmbpTr2wQC152QP') {
                //papa chola gruesa
                this.papaGruesa = this.combos[i].cantidad;

            } else if (this.combos[i].id == 'tej6Jla2vXcS8SBwQbsf') {
                //naranja nacional
                this.naranja = this.combos[i].cantidad;
            } else if (this.combos[i].id == '5SlBQhGPda2NNQeqMqiG') {
                //papa chola mediana
                this.papaMediana = this.combos[i].cantidad;
            }
        }
    }

    guardarPaquetes = () => {

    }

    render() {
        for (var j = 0; j < this.state.listaPaquetesPedido.length; j++) {
            if (this.state.listaPaquetesPedido[j].id == "cubetas") {
                this.state.listaPaquetesPedido[j].cantidad = this.cubetas;
            } else if (this.state.listaPaquetesPedido[j].id == "papasGruesas") {
                this.state.listaPaquetesPedido[j].cantidad = this.papaGruesa;
            } else if (this.state.listaPaquetesPedido[j].id == "papasMedianas") {
                this.state.listaPaquetesPedido[j].cantidad = this.papaMediana;
            } else if (this.state.listaPaquetesPedido[j].id == "naranjas") {
                this.state.listaPaquetesPedido[j].cantidad = this.naranja;
            }
        }
        console.log("*****LISTA COMPLETA*****" + JSON.stringify(this.state.listaPaquetesPedido))
        return (
            <SafeAreaView>
                <View style={[styles.container, { marginVertical: 15, alignItems: "center" }]}>
                    <Text style={{ fontWeight: "bold" }}>LISTADO DE PAQUETES</Text>
                </View>


                <View style={[styles.fila, { marginTop: 15 }]}>
                    <View style={styles.columna1}>
                        <Text style={{ fontWeight: "bold" }}> DESCRIPCIÓN </Text>
                    </View>
                    <View style={styles.columna2}>
                        <Text style={{ fontWeight: "bold" }}> CANTIDAD </Text>
                    </View>

                </View>
                <View >
                    <FlatList
                        data={this.state.listaPaquetesPedido}
                        renderItem={(obj) => {
                            return (
                                <ItemPaquetes
                                    nav={this.props.navigation}
                                    paquete={obj.item}
                                />
                            );
                        }}
                        keyExtractor={paquete => {
                            return paquete.id;
                        }}
                    />
                </View>
                <View >
                    <Text style={{ marginHorizontal: 15, marginVertical: 15, fontWeight: "bold" }}>OBSERVACIONES ADICIONALES:</Text>
                </View>
                <View >
                    <TextInput
                        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginHorizontal: 15, marginBottom: 15 }}
                        placeholder={'Ejm: Muestra gratis, funda de papas extra'}
                        multiline={true}
                        numberOfLines={10}
                        value={this.state.observacion}
                        onChangeText={text => {
                            this.setState({observacion:text})
                         }}
                    ></TextInput >
                </View>

                <Button
                    title="Guardar"
                    onPress={() => {
                       /* var paquetes = {}
                        for(var i = 0; i < this.state.listaPaquetesPedido.length; i++){
                            paquetes [this.state.listaPaquetesPedido[i].id]= this.state.listaPaquetesPedido[i];
                          }
                          paquetes ["observacion"] ={detalle: this.state.observacion, id: "observacion"};
                        console.log("****LISTAMODIFICADA*****" + JSON.stringify(paquetes));*/
                        let srvPedido = new ServicioPedidos();
                        srvPedido.guardarPaquetes( this.idPedido, this.state.listaPaquetesPedido, this.state.observacion);
                    }}></Button>
            </SafeAreaView>
        );
    }
}

const borderLinea = 15;

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
        justifyContent: "center",
        alignItems: "center",
    },
    columna2: {
        flex: 1.5,
        // backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", // alinea verticalmente
    },
    boton: {
        paddingVertical: 5,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: colores.colorPrimarioVerde,
        /* alignItems: 'stretch',
           justifyContent: 'center',*/
    },
    fondo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    cabecera: {
        flex: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    lista: {
        flex: 15,
        marginBottom: 10,
    },
    textoNegritaSubrayado: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },

    textoNegrita: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
    },
    contenedorDireccione: {
        marginHorizontal: 20,
        backgroundColor: colores.colorBlanco,
        height: 40,
        borderRadius: 20,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    pie: {
        flex: 3,
        backgroundColor: colores.colorBlanco,
        //borderTopStartRadius: 20,
        // borderTopEndRadius: 20,
        marginTop: 10,
        paddingTop: 10,
    },
    texto: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    estiloContenedorTitulo: {
        paddingBottom: 10,
    },
    contenedorTituloSubr: {
        borderBottomColor: colores.colorOscuroTexto,
        borderBottomWidth: 1,
    },
    estiloBotonBlanco: {
        backgroundColor: colores.colorPrimarioAmarillo,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
    },
    estiloBotonVerde: {
        backgroundColor: colores.colorPrimarioVerde,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
    },
    estiloContenedor: {
        width: '100%',
        padding: 0,
        margin: 0,
    },
    iconos: { marginRight: 0 },
    cabeceraContenedor: {
        flexDirection: 'row',
        // height: 50,
        marginRight: 20,
        marginLeft: 10,
    },
    cabeceraBoton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cabeceraTitulo: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        //backgroundColor: 'red',
    },
    titulo: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    iconoBadge: {
        //  backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 2,
    },
    areaBadge: {
        //  backgroundColor: 'blue',
        //flex: 1,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 5,
    },
});
