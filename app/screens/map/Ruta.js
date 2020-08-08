import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  Button,
  TouchableOpacity,
  Linking
} from "react-native";
import { Icon } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { apiKeyMaps } from "../../utils/ApiKey";
import { callNumber } from "../../utils/Contacto";
import openMap from "react-native-open-maps";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = -0.223219;
const LONGITUDE = -78.5048;
const LATITUDE_DELTA = 0.024;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Ruta extends Component {
  constructor(props) {
    super(props);
    console.log("Props Ruta", props);
    //cuando vengo por actualizar direccion obtengo los datos de la
    //direccion seleccionada
    this.jornada = this.props.route.params.jornada;
    this.direccion = this.props.route.params.direccion;

    this.state = {
      isMapReady: false,
      direccion: this.direccion,
      origen: {},
      coords: [],
    };
    this.obtenerCoordenadas();
  }

  openAppMap = () => {
    const ruta =
      this.direccion.coordinates.latitude +
      "," +
      this.direccion.coordinates.longitude;

    console.log(ruta);

    openMap({
      zoom: 19,
      query: ruta,
    });
  };

  obtenerRuta = async () => {
    const mode = "driving";
    const direccionDestino = this.state.direccion;
    const direccionOrigen = this.state.origen;
    const origin =
      "" + direccionOrigen.latitude + "," + direccionOrigen.longitude + "";
    const destination =
      "" +
      direccionDestino.coordinates.latitude +
      "," +
      direccionDestino.coordinates.longitude +
      "";
    const url =
      "https://maps.googleapis.com/maps/api/directions/json?origin=" +
      origin +
      "&destination=" +
      destination +
      "&mode=" +
      mode +
      "&key=" +
      apiKeyMaps;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.routes.length) {
          this.setState({
            coords: this.decode(
              responseJson.routes[0].overview_polyline.points
            ), // definition below
          });
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  decode = (t, e) => {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(function (t) {
      return { latitude: t[0], longitude: t[1] };
    }));
  };
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  obtenerCoordenadas = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          origen: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });

        this.obtenerRuta();
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentDidMount() {
    Geocoder.init("AIzaSyBT6f7vFsolmPyhs94f3E_Y54z0SIMv2wo");
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  handleRegionChange = (mapData) => {
    this.setState({
      coordinate: {
        latitude: mapData.latitude,
        longitude: mapData.longitude,
      },
      region: mapData,
    });
  };

  onRegionChangeComplete = async (region) => {
    this.nueva = new Date().getTime();
    setTimeout(async () => {
      if (new Date().getTime() - this.nueva > 1000) {
        let response = await Geocoder.from(region.latitude, region.longitude);
      }
    }, 1000);
  };

  onRegionChange = (region) => {
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
          <Text>CODIGO: {this.state.direccion.orden}</Text>
          <Text>NOMBRE CLIENTE: {this.state.direccion.nombreCliente}</Text>
          <Text>TELEFONO CLIENTE:</Text>
          <View style={{ flexDirection: "row",margin:10  }}>
          <Text  style={{ fontSize:20 }}> {this.state.direccion.telefonoCliente}</Text>  
              <Icon
                name="phone-outgoing"
                type="material-community"
                color="#3b83bd"
                size={50}
                onPress={() => {
                  callNumber(this.state.direccion.telefonoCliente);
                }}
                style={{marginHorizontal:10 }}
              />
            <Icon
                name="whatsapp"
                type="material-community"
                color="#3b83bd"
                size={50}
                onPress = {() => {
                  console.log(this.state.direccion);
                  const text = 'Hola soy '+ this.state.direccion.nombreAsociado+', su repartidor de Yappando le informamos que su pedido se encuentra en camino.'
                  let numero = '593'+this.state.direccion.telefonoCliente;
                  Linking.openURL(
                     'https://wa.me/' + numero + '?text=' + text
                  );
                }}
                style={{marginHorizontal:10 }}
              />
          </View>

          <Button title={"Navegar"} onPress={this.openAppMap}></Button>
          <View style={{ marginBottom: 10 }}></View>
          <Button
            title="ENTREGAR PEDIDO"
            onPress={() => {
              navigation.navigate("ResumenPedido", {
                direccion: this.state.direccion,
                jornada: this.jornada,
              });
            }}
          ></Button>
          {this.state.region ? (
            <MapView
              style={{ width: width, height: height }}
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
              <MapView.Marker
                ref={(ref) => {
                  this.maker = ref;
                }}
                coordinate={this.state.direccion.coordinates}
                title={this.state.direccion.direccion}
              />
              {this.state.coords && (
                <Polyline
                  coordinates={this.state.coords}
                  strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={[
                    "#7F0000",
                    "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                    "#B24112",
                    "#E5845C",
                    "#238C23",
                    "#7F0000",
                  ]}
                  strokeWidth={4}
                />
              )}
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
    alignItems: "stretch",
    paddingTop: 10,
  },
  mapStyle: {
    flex: 3,
    width: "100%",
  },
});
