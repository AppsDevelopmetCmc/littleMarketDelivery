import { Alert } from "react-native";

export const recuperarDocumento = (coleccion, idDoc, fnRepintar) => {
  try {
    global.db
      .collection(coleccion)
      .doc(idDoc)
      .onSnapshot((snapShot) => {
        fnRepintar(snapShot.data());
      });
    /*.get()
      .then((info) => {
        fnRepintar(info.data());
      })
      .catch((error) => {
        console.log("error1" + error);
      });*/
  } catch (error) {
    console.log("error2" + error);
  }
};

export const coleccionDeColeccion = (
  coleccion,
  idDoc,
  subColeccion,
  fnRepintar
) => {
  console.log("---DATA---" + coleccion + idDoc + subColeccion )
  let productos = [];

  global.db
    .collection(coleccion)
    .doc(idDoc)
    .collection(subColeccion)
    .onSnapshot((snapShot) => {
      snapShot.docChanges().forEach((change) => {
        if (change.type == "added") {
          productos.push(change.doc.data());
          fnRepintar(productos);
        }
        if (change.type == "modified") {
          productos[change.newIndex] = change.doc.data();
          fnRepintar(productos);
        }
        if (change.type == "removed") {
          productos.splice(change.oldIndex, 1);
          fnRepintar(productos);
        }
      });
    });
   
};

export const modificarColeccion = (
  coleccion,
  idDoc,
  subColeccion,
  subId,
  estado
) => {
  let promesa = global.db
    .collection(coleccion)
    .doc(idDoc)
    .collection(subColeccion)
    .doc(subId)
    .update(estado);
  try {
    promesa
      .then(() => {
        //Alert.alert("actualizado");
      })
      .catch((error) => {
        Alert.alert("error promesa");
      });
  } catch (error) {
    Alert.alert("error try");
  }
};

export const modificarDocumento = (coleccion, idDoc, datos) => {
  let promesa = global.db.collection(coleccion).doc(idDoc).update(datos);
  try {
    promesa
      .then(() => {
        //Alert.alert("actualizado");
      })
      .catch((error) => {
        Alert.alert("error promesa");
      });
  } catch (error) {
    Alert.alert("error try");
  }
};
