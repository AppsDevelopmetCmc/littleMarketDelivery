import { Alert } from "react-native";

export const recuperarPedidosAsociado = (
  coleccion,
  documentos,
  fnRepintar,
  jornada
) => {
  const obtenerMes = new Date().getMonth() + 1;
  const obtenerDia = new Date().getDate();
  let dia = obtenerDia < 10 ? "0" + obtenerDia : obtenerDia;
  let mes = obtenerMes < 10 ? "0" + obtenerMes : obtenerMes;
  let anio = new Date().getFullYear();
  let fechaActual = "" + anio + "-"+ mes + "-" + dia ;


  global.db
    .collection(coleccion)
    .where("estado", "in", ["AA", "PI", "CT"])
    .where("fechaEntrega", "==", fechaActual)
    .where("asociado", "==", global.usuario)
    .onSnapshot((snapShot) => {
      snapShot.docChanges().forEach((change) => {
        let data = change.doc.data();
        // console.log(data);
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
          nombreAsociado: data.nombreAsociado
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
