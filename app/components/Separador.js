import React from "react";
import { View } from "react-native";

export function Separador(props) {
  const { alto, ancho } = props;

  return <View style={{ height: alto, width: ancho }}></View>;
}
