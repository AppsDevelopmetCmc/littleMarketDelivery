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

/*export const recuperarColeccion = (coleccion, documentos, fnRepintar) => {
  global.db.collection(coleccion).onSnapshot((snapShot) => {
    snapShot.docChanges().forEach((change) => {
      if (change.type == "added") {
        documentos.push(change.doc.data());
        fnRepintar(documentos);
      }
      if (change.type == "modified") {
        documentos[change.newIndex] = change.doc.data();
        fnRepintar(documentos);
      }
      if (change.type == "removed") {
        documentos.splice(change.oldIndex, 1);
        fnRepintar(documentos);
      }
    });
  });
};

export const getPedidosById = (coleccion, idAsociado, fnRepintar) => {
  let documentos = [];
  let pedidos = {};
  var fechaLimite = new Date();
  fechaLimite = fechaLimite.setDate(fechaLimite.getDate() + 5);

  global.db.collection(coleccion).onSnapshot((snapShot) => {
    snapShot.docChanges().forEach((change) => {
      if (change.type == "added") {
        var fechaEntrega = change.doc.data().fechaEntrega.split("/");
        var fecha = new Date(
          fechaEntrega[2],
          fechaEntrega[1] - 1,
          fechaEntrega[0]
        ).getTime();
        if (
          change.doc.data().asociado == idAsociado &&
          change.doc.data().estado == "p" &&
          fecha <= fechaLimite
        ) {
          pedidos = change.doc.data();
          pedidos.id = change.doc.id;
          documentos.push(pedidos);
        }
        fnRepintar(documentos);
      }
      if (change.type == "modified") {
        let pedido = change.doc.data();
        pedido.id = change.doc.id;
        documentos[change.newIndex] = pedido;
        fnRepintar(documentos);
      }
      if (change.type == "removed") {
        documentos.splice(change.oldIndex, 1);
        fnRepintar(documentos);
      }
    });
  });
};*/

/*export const crear = (coleccion, nuevoObj) => {
  let promesa = global.db.collection(coleccion).doc(nuevoObj.id).set(nuevoObj);

  try {
    promesa
      .then(() => {})
      .catch((error) => {
        console.log("error1" + error);
      });
  } catch (error) {
    console.log("error2" + error);
  }
};

export const eliminar = (coleccion, idDoc) => {
  let promesa = global.db.collection(coleccion).doc(idDoc).delete();
  try {
    promesa
      .then(() => {
        Alert.alert("eliminado");
      })
      .catch((error) => {
        console.log("error1" + error);
      });
  } catch (error) {
    console.log("error2" + error);
  }
};*/
