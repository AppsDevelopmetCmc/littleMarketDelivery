import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import { ServicioPedidos } from '../../services/ServicioPedidos';
import { ItemPedido } from './componentes/ItemPedido'
import { formatearFechaISO } from '../../utils/DateUtil';
import * as colores from '../../constants/Colores';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cargando from '../../components/Cargando'

export class ListaPedidoCombo extends Component {
   constructor(props) {
      super(props);
      let lista = [];
      this.state = {
         listaPedidos: lista,
         fecha: new Date(),
         show: false,
         mostrarCargando: false,

      }

   }

   componentDidMount() {
      console.log("Ingresa")
   }

   consultarPedidoFecha = () => {
      //Alert.alert('usuario',global.usuario);
      this.setState({ mostrarCargando: true });
      let pedidos = [];
      let srvPedido = new ServicioPedidos();
      srvPedido.registrarEscuchaTodasFechaRepartidor(formatearFechaISO(this.state.fecha), global.usuario,
         pedidos, this.repintarLista, this.finalizarCargando)

   }

   repintarLista = (pedido) => {
      console.log("ListaPedido", pedido)
      this.setState({
         listaPedidos: pedido
      })
   }

   finalizarCargando = (numeroCambios) => {
      console.log('Finalizando ');
      if (numeroCambios == 0) {
         this.setState({ listaPedidos: [] });
         Alert.alert("Información", 'No existen Pedidos para el asociado '
            + global.usuario + ' en la fecha: ' + formatearFechaISO(this.state.fecha));
      }
      this.setState({ mostrarCargando: false });
   };

   pedidoCombo = combo => {
      this.props.navigation.navigate('ListaItemsPedidoComboScreen', {
         pedidoCombo: combo,

      });
   };

   onChange = (event, selectedDate) => {

      let currentDate = selectedDate || this.state.fecha;
      this.setState({ show: false })
      this.setState({ fecha: currentDate })
   };

   showDatepicker = () => {
      this.setState({ show: true })
   };


   render() {
      return (
         <View style={styles.columna}>
            <View style={styles.cabeceraTitulo}>
               <Text style={styles.tituloCabecera}>Yappando</Text>
            </View>
            <View style={styles.date}>
               <View style={styles.fila}>
                  <View style={styles.datePicker}>
                     <Text style={styles.textoNegritaBlanco}>
                        {'Seleccione la Fecha'}
                     </Text>
                     <TouchableHighlight
                        underlayColor={colores.colorClaroPrimarioVerde}
                        onPress={() => {
                           this.showDatepicker();
                        }}>
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
                           mode='date'
                           display="default"
                           onChange={this.onChange}
                        />)}
                  </View>
                  <View style={styles.viewBtn}>
                     <View style={styles.btn}>
                        <Button title="Consultar" onPress={this.consultarPedidoFecha} />
                     </View>

                  </View>
                  <Cargando
                     text="Buscando Pedidos..."
                     isVisible={this.state.mostrarCargando}
                  ></Cargando>
               </View>
            </View>
            <View style={styles.pie}>
               <View style={styles.titulo}>
                  <Text style={styles.textoNegrita}>{'Despachar Productos'}</Text>
               </View>
               <View style={styles.lista}>
                  <FlatList
                     data={this.state.listaPedidos}
                     renderItem={objeto => {
                        return (
                           <ItemPedido
                              pedido={objeto.item}
                              fecha={formatearFechaISO(this.state.fecha)}
                              fnpPedidoCombo={this.pedidoCombo}
                           />
                        );
                     }}
                     keyExtractor={objetoPedido => {
                        return objetoPedido.id;
                     }}
                     ItemSeparatorComponent={flatListItemSeparator}
                  />
               </View>

            </View >
         </View>
      );
   }

}
const flatListItemSeparator = () => {
   return (
      <View
         style={{
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
         }}
      >
         <View
            style={{
               height: 0.5,
               width: '100%',
               backgroundColor: colores.colorOscuroTexto,

               alignItems: 'center',
               justifyContent: 'center',
               alignContent: 'center',
            }}
         ></View>
      </View>
   );
};

const styles = StyleSheet.create({

   titulo: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: colores.colorClaroPrimarioTomate,
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      marginLeft: 15,
      marginRight: 5
   },
   container: {
      flex: 1,
      //backgroundColor: '#fff',
      backgroundColor: 'skyblue',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   cabeceraTitulo: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginHorizontal: 10,
      //backgroundColor: 'red',
   },
   columna: {
      flex: 1,
      backgroundColor: colores.colorPrimarioVerde,
   },
   fila: {
      flexDirection: 'row'
   },
   date: {
      flex: 1

   },
   datePicker: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center'

   },
   lista: {
      flex: 12,
      paddingVertical: 15,
      marginLeft: 10,
      borderTopStartRadius: 30,
   },
   viewBtn: {
      flex: 1,
      justifyContent: 'center'
   },
   btn: {
      marginTop: 20,

   },

   textoNegrita: {
      marginTop: 0,
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 17,
   },
   textoNegritaBlanco: {
      marginTop: 0,
      marginLeft: 10,
      fontWeight: 'bold',
      fontSize: 17,
      color:'white'
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
      color: 'white'

   },
   borderFecha: {
      flex: 3,
      borderWidth: 1,
      alignItems: 'center'
   },
   txtFecha: {
      marginTop: 5,
      marginBottom: 5
   },
   contenedorIcon: {
      flex: 1,
      color:'white'
   },
   tituloCabecera: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
   },
});

