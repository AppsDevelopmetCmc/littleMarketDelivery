import firebase from "firebase";
import "@firebase/firestore";
import { ArregloUtil } from "../utils/utils";
import { Alert } from "react-native";
import "@firebase/storage";

export class ServicioPedidos {
  obtenerPedidoFechaTotal = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          let pedidoItem = documentos[i].data();
          pedidoItem.id = documentos[i].id;
          pedidos.push(pedidoItem);
          let coleccionCombos = await global.db
            .collection("pedidos")
            .doc(documentos[i].id)
            .collection("combos")
            .get();
          let combos = coleccionCombos.docs;
          let listaCombos = [];
          for (let j = 0; j < combos.length; j++) {
            listaCombos.push(combos[j].data());
          }
          pedidos[i].listaCombos = listaCombos;
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoFecha = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          if (documentos[i].data().estado !== "CA") {
            let pedidoItem = documentos[i].data();
            pedidoItem.id = documentos[i].id;
            pedidos.push(pedidoItem);
          }
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoFechaTrans = async (fecha, fnRepintar) => {
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .where("formaPago", "==", "TRANSFERENCIA")
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidos = [];
        for (let i = 0; i < documentos.length; i++) {
          if (documentos[i].data().estado !== "CA") {
            let pedidoItem = documentos[i].data();
            pedidoItem.id = documentos[i].id;
            pedidos.push(pedidoItem);
          }
        }
        fnRepintar(pedidos);
      });
  };

  obtenerPedidoCombo = async (idPedido, fnRepintar) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .get()
      .then(async function (coleccion) {
        let documentos = coleccion.docs;
        let pedidosCombo = [];
        for (let i = 0; i < documentos.length; i++) {
          let pedidoComboItem = documentos[i].data();
          pedidoComboItem.id = documentos[i].id;
          pedidosCombo.push(pedidoComboItem);
        }
        fnRepintar(pedidosCombo);
      });
  };

  obtenerProductos = async () => {
    let documentos = await global.db
      .collection("items")
      .where("estado", "==", "V")
      .orderBy("posicion")
      .get();
    let items = [];
    for (let i = 0; i < documentos.docs.length; i++) {
      let productoItem = documentos.docs[i].data();
      productoItem.id = documentos.docs[i].id;
      items.push(productoItem);
    }
    return items;
  };

  confirmarTransferencia = (idPedido, objeto, fnRepintar) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .update({
        asociado: objeto.asociado,
        estado: objeto.estado,
      })
      .then(function (coleccion) {
        console.log("coleccion", coleccion);
        fnRepintar(coleccion);
        Alert.alert("Información", "Cobro de Transferencia Confirmada");
      })
      .catch(function (error) {
        Alert.alert("Se ha Producido un Error", error);
      });
  };

  registrarEscuchaTodasFechaRepartidor = (
    fecha,
    repartidor,
    arreglo,
    fnRepintar,
    fnFinalizar
  ) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      .where("fechaEntrega", "==", fecha)
      .where("asociado", "==", repartidor)
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          if (change.doc.data().estado !== "CA") {
            let pedido = change.doc.data();
            pedido.id = change.doc.id;
            if (change.type == "added") {
              arregloUtil.agregar(pedido, fnRepintar);
            }
            if (change.type == "modified") {
              arregloUtil.actualizar(pedido, fnRepintar);
            }
            if (change.type == "removed") {
              arregloUtil.eliminar(pedido, fnRepintar);
            }
          }
        });
        fnFinalizar(snapShot.docChanges().length);
      });
  };

  registrarEscuchaPedidoCombo = (idPedido, arreglo, fnRepintar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos").orderBy("posicionEmpacado", "asc")
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          let pedidoItems = change.doc.data();
          pedidoItems.id = change.doc.id;
          if (change.type == "added") {
            arregloUtil.agregar(pedidoItems, fnRepintar);
          }
          if (change.type == "modified") {
            arregloUtil.actualizar(pedidoItems, fnRepintar);
          }
          if (change.type == "removed") {
            arregloUtil.eliminar(pedidoItems, fnRepintar);
          }
        });
      });
  };

  obtenenerPaquetes = (idPedido, arreglo, fnPintar) => {
    let arregloUtil = new ArregloUtil(arreglo);
    global.db
      .collection("paquetes").orderBy("editable", "asc")
      .onSnapshot(function (snapShot) {
        snapShot.docChanges().forEach(function (change) {
          let paquetesItems = change.doc.data();
          paquetesItems.id = change.doc.id;
          if (change.type == "added") {
            arregloUtil.agregar(paquetesItems, fnPintar);
          }
          if (change.type == "modified") {
            arregloUtil.actualizar(paquetesItems, fnPintar);
          }
          if (change.type == "removed") {
            arregloUtil.eliminar(paquetesItems, fnPintar);
          }
        });
      });
  }

  guardarPaquetes = (idPedido, array, observacion) => {
    var success = true;
   console.log("*****ARRAY*****" + JSON.stringify(array));
    array[array.length]={id:"observacion", detalle: observacion, descripcion:"Observacion"};
    console.log("*****ARRAY*****" + JSON.stringify(array));
    for (var i = 0; i < array.length; i++) {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("paquetes")
      .doc(array[i].id)
      .set(array[i]).then(() => {
        console.log("*****CAMBIO CORRECTO****");
      }).catch(error => {
         success = false;
        console.log("******ERROR******" + error);
      })
    }
    if(success){
      Alert.alert('', 'Guardado Correctamente');
    }
  }

  actualizarRecibidoPC = (idPedido, objeto) => {
    console.log(idPedido);
    console.log(objeto);
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .doc(objeto.id)
      .update({
        recibido: objeto.recibido,
      })
      .then(function () {
        global.db
          .collection("pedidos")
          .doc(idPedido)
          .collection("combos")
          .where("recibido", "==", false)
          .get()
          .then(function (coleccion) {
            if (coleccion.docs.length == 0) {
              console.log("coleccion", coleccion);
              global.db
                .collection("pedidos")
                .doc(idPedido)
                .update({
                  recibido: true,
                })
                .then(function () {
                  Alert.alert(
                    "Información",
                    "Se ha recibido todos los productos para el Pedido"
                  );
                })
                .catch(function (error) {
                  Alert.alert("Se ha producido un Error", error);
                });
            } else {
              global.db
                .collection("pedidos")
                .doc(idPedido)
                .update({
                  recibido: false,
                })
                .then(function () {
                  console.log("Se actualizo a false el empcado del pedido");
                })
                .catch(function (error) {
                  Alert.alert("Se ha producido un Error", error);
                });
            }
          });
      })
      .catch(function (error) {
        Alert.alert("Se ha producido un Error", error);
      });
  };

  actualizarEmpacadoP = (idPedido) => {
    global.db
      .collection("pedidos")
      .doc(idPedido)
      .collection("combos")
      .where("empacado", "==", false)
      .get()
      .then(function (coleccion) {
        if (coleccion.docs.length == 0) {
          global.db
            .collection("pedidos")
            .doc(idPedido)
            .update({
              empacado: true,
            })
            .then(function () {
              Alert.alert(
                "Información",
                "Se ha empacado todos los productos para el Pedido"
              );
            })
            .catch(function (error) {
              Alert.alert("Se ha producido un Error", error);
            });
        }
      });
  };
}
