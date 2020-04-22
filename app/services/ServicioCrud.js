import { Alert } from "react-native";

export const recuperarDocumento = (coleccion, idDoc, fnRepintar) => {
  // en este caso trae la info del doc frutilla
  try {
    global.db
      .collection(coleccion)
      .doc(idDoc)
      .get()
      .then((info) => {
        info.data();
        fnRepintar(info.data().imagen);
      })
      .catch((error) => {
        console.log("error1" + error);
      });
  } catch (error) {
    console.log("error2" + error);
  }
};

export const recuperarColeccion = (coleccion, documentos, fnRepintar) => {
  /*let promesa = global.db.collection(coleccion).get();

  try {
    promesa
      .then((infoCol) => {
        let documentos = infoCol.docs; //recupero los documentos de la coleccion esto es un arreglo
        let productos = [];
        for (let i = 0; i < documentos.length; i++) {
          productos.push(documentos[i].data());
        }
        fnRepintar(productos);
      })
      .catch((error) => {
        console.log("error Recuperar todos" + error);
      });
  } catch (error) {
    console.log("recuperarTodos" + error);
  }*/

  let aux = [];
  global.db.collection(coleccion).onSnapshot( (snapShot) => {
      snapShot.docChanges().forEach((change) => {
        if (change.type == 'added') {
            documentos.push(change.doc.data());
            fnRepintar(documentos);
        }   
        if (change.type == 'modified') {
            documentos[change.newIndex] = change.doc.data();
            fnRepintar(documentos);
        }
        if (change.type == 'removed') {
            documentos.splice(change.oldIndex, 1);
            fnRepintar(documentos);
        }
      })
  })
};

export const crear = (coleccion, nuevoObj) => {
  let promesa = global.db.collection(coleccion).doc(nuevoObj.id).set(nuevoObj);

  try {
    promesa
      .then(() => {
        Alert.alert("agregado");
      })
      .catch((error) => {
        console.log("error1" + error);
      });
  } catch (error) {
    console.log("error2" + error);
  }
};

export const modificar = (coleccion, idDoc, datos) => {
  let promesa = global.db
    .collection(coleccion)
    .doc(idDoc)
    .update(datos);
  try {
    promesa
      .then(() => {
        Alert.alert("actualizado");
      })
      .catch((error) => {
        Alert.alert("error promesa");
      });
  } catch (error) {
    Alert.alert("error try");
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
};
