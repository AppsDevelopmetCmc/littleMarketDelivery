import { StyleSheet } from "react-native";
import * as colores from "../../constants/Colores";

export const estiloGlobal = StyleSheet.create({
  contenedorPagina: { flex: 1, backgroundColor: colores.colorPrimarioVerde },
  cabecera: {
    backgroundColor: colores.colorPrimarioVerde,
    paddingHorizontal: 25,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tituloCabera: { paddingVertical: 10 },
  pie: {
    flex: 1,
    backgroundColor: colores.colorBlanco,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    paddingHorizontal: 25,
    marginTop: 10,
    paddingTop: 10,
  },
  divide: {
    backgroundColor: colores.colorPrimarioTexto,
    width: "42%",
    height: 1,
  },
  socialIconos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
