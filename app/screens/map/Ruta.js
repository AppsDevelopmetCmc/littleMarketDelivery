import React, { Component, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { apiKeyMaps } from '../../utils/ApiKey';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -0.223219;
const LONGITUDE =  -78.5048;
const LATITUDE_DELTA = 0.1522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Ruta extends Component {
   constructor(props) {
      super(props);
      //cuando vengo por actualizar direccion obtengo los datos de la
      //direccion seleccionada
      this.origen = this.props.route.params.origen;
      this.direccion = this.props.route.params.direccion;
      this.state = {
         isMapReady: false,
         direccion: this.direccion,
      };
   }

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
   

   render() {
      const { navigation, horario } = this.props;
      return (
        <View style={[styles.container]}>
          <View style={{ flex: 1 }}>
             <Text>REFERENCIA: {this.state.direccion.referencia}</Text>
          <Button title='TERMINAR PEDIDO'
               onPress={() => {
              navigation.navigate("ResumenPedido");
               }}
        ></Button>
            {this.state.region ? (
              <MapView
                style={{ width: width, height: height}}
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
