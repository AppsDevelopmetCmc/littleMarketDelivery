import { Alert } from "react-native";

export const recuperarPedidosAsociado = (
  coleccion,
  documentos,
  fnRepintar,
  jornada
) => {
  const obtenerMes = new Date().getMonth() + 1;
  let dia = new Date().getDate();
  let mes = obtenerMes < 10 ? "0" + obtenerMes : obtenerMes;
  let anio = new Date().getFullYear();
  let fechaActual = "" + dia + "/" + mes + "/" + anio;

  console.log("Repartidor", global.usuario);
  global.db
    .collection(coleccion)
    .where("estado", "in", ["AA", "PI", "CT"])
    .where("fechaEntrega", "==", "2020-06-30")
    .where("asociado", "==", global.usuario)
    .onSnapshot((snapShot) => {
      snapShot.docChanges().forEach((change) => {
        let data = change.doc.data();
        let obj = {
          nombreCliente: data.nombreCliente,
          telefonoCliente: data.telefono,
          orden: data.orden,
          key: change.doc.id,
          direccion: data.direccion,
          referencia: data.referencia,
          coordinates: {
            latitude: data.latitud,
            longitude: data.longitud,
          },
        };
        if (change.type == "added") {
          documentos.push(obj);
          fnRepintar(documentos);
        }
        if (change.type == "modified") {
          documentos[change.newIndex] = obj;
          fnRepintar(documentos);
        }
        if (change.type == "removed") {
          documentos.splice(change.oldIndex, 1);
          fnRepintar(documentos);
        }
      });
    });
};
