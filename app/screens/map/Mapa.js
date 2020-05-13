import React, { Component, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { apiKeyMaps } from '../../utils/ApiKey';
import { recuperarPedidosAsociado } from '../../services/Pedidos';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -0.223219;
const LONGITUDE =  -78.5048;
const LATITUDE_DELTA = 0.1522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Mapa extends Component {
   constructor(props) {
      super(props);
      //cuando vengo por actualizar direccion obtengo los datos de la
      //direccion seleccionada
      this.origen = this.props.route.params.origen;
      this.direccion = this.props.route.params.direccion;
      this.pintarElemento = true;
      if (this.origen == 'M') {
         this.pintarElemento = true;
      }
      this.state = {
         isMapReady: false,
         direccion: '',
         markers: []
      };
      recuperarPedidosAsociado("pedidos", this.state.markers, this.pintarLista, this.origen);
   }
   pintarLista = (arregloProd) => {
      this.setState({ markers: arregloProd });
    };

   obtenerCoordenadas = async () => {
      
         this.setState({
            region: {
               latitude: LATITUDE,
               longitude: LONGITUDE,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
               latitude: LATITUDE,
               longitude: LONGITUDE,
            },
         });
   };

   componentDidMount() {
      Geocoder.init('AIzaSyBT6f7vFsolmPyhs94f3E_Y54z0SIMv2wo');
      this.obtenerCoordenadas();
   }

   obtenerDireccion = async (latitude, longitude) => {
      let addressComponent = '';
      Geocoder.from(latitude, longitude)
         .then(json => {
            addressComponent = json.results[0].formatted_address;
           // console.log(addressComponent);
            this.setState({ direccion: addressComponent });
         })
         .catch(error => console.warn(error));
   };

   onMapLayout = () => {
      this.setState({ isMapReady: true });
   };

   handleRegionChange = mapData => {
      this.setState({
         coordinate: {
            latitude: mapData.latitude,
            longitude: mapData.longitude,
         },
         region: mapData,
      });
   };

 
   onRegionChangeComplete = async region => {
      this.nueva = new Date().getTime();
      setTimeout(async () => {
         if (new Date().getTime() - this.nueva > 1000) {
            let response = await Geocoder.from(
               region.latitude,
               region.longitude
            );
            this.generarDireccion(response.results[0]);
         }
      }, 1000);
   };

   onRegionChange = region => {
      this.setState({
         coordinate: { latitude: region.latitude, longitude: region.longitude },
      });
   };
   generarDireccion = info => {
     // console.log('info', info.address_components);
      let componentes = info.address_components;
      let direccionName = {};
      if (componentes) {
         for (let i = 0; i < componentes.length; i++) {
            let componente = componentes[i];
            console.log('componente', componente);
            for (let j = 0; j < componente.types.length; j++) {
               if (componente.types[j] == 'route') {
                  direccionName.route = componente.short_name;
               }
               if (componente.types[j] == 'point_of_interest') {
                  direccionName.point_of_interest = componente.short_name;
               }
               if (componente.types[j] == 'street_number') {
                  direccionName.street_number = componente.short_name;
               }
               if (componente.types[j] == 'sublocality') {
                  direccionName.sublocality = componente.short_name;
               }
               if (componente.types[j] == 'locality') {
                  direccionName.locality = componente.short_name;
               }
               if (componente.types[j] == 'country') {
                  direccionName.country = componente.long_name;
               }
            }
         }
      }
      //point_of_interest, route street_number, sublocality, locality
      //console.log('direccion===>', direccionName);
      let nombreDireccion = '';

      if (direccionName) {
         let numeroCalle =
            direccionName.route + ' ' + direccionName.street_number;
         let resNumeroCalle = numeroCalle.replace(/undefined/gi, '');
         let str =
            direccionName.point_of_interest +
            ',' +
            resNumeroCalle +
            ',' +
            direccionName.sublocality +
            ',' +
            direccionName.locality +
            ',' +
            direccionName.country;
         let res = str.replace(/, ,/gi, ',');
         nombreDireccion = res.replace(/undefined,/gi, '');
      }

      //console.log('direccionName===>', nombreDireccion);
      this.setState({ direccion: nombreDireccion });
   };
   onMarkerPress = i => {
      const { navigation } = this.props;
         navigation.navigate('Ruta', {
            direccion: this.state.markers[i],
            horario: this.origen
         });
   }

   render() {
      const { navigation } = this.props;
      return (
        <View style={[styles.container]}>
          <View style={{ flex: 1 }}>
            {this.state.region ? (
              <MapView
                style={{ width: width, height: height - 50 }}
                provider={PROVIDER_GOOGLE}
                mapType="standard"
                showsScale
                showsCompass
                showsPointsOfInterest
                showsBuildings
                showsUserLocation
                loadingEnabled={true}
                ref={(map) => (this.map = map)}
                onLayout={this.onMapLayout}
                initialRegion={this.state.region}
                onRegionChangeComplete={(region) => {
                  this.onRegionChangeComplete(region);
                }}
                onRegionChange={(region) => {
                  this.onRegionChange(region);
                }}
              >
                {this.state.markers.map((marker, index) => (
                  <MapView.Marker
                  ref = {ref => {this.maker = ref;}}
                    key={index}
                    coordinate={marker.coordinates}
                    title={marker.direccion}
                    onPress={() => { this.onMarkerPress(index) }}
                  />
                ))}
              </MapView>
            ) : (
              <Text>Cargando</Text>
            )}
          </View>
        </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'stretch',
      paddingTop: 10,
   },
   mapStyle: {
      flex: 3,
      width: '100%',
   },
});
