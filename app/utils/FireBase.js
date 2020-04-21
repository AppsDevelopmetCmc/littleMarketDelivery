import firebase from "firebase";
import "@firebase/firestore";
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }

export const cargarConfiguracion = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCuPTN-HQyPxrLUr40Bl2nmX5PqNCUVnJg",
    authDomain: "little-market-dev-377b6.firebaseapp.com",
    databaseURL: "https://little-market-dev-377b6.firebaseio.com",
    projectId: "little-market-dev-377b6",
    storageBucket: "little-market-dev-377b6.appspot.com",
    messagingSenderId: "549900659572",
    appId: "1:549900659572:web:ce8621915b320376469a21",
  };
  firebaseApp = firebase.initializeApp(firebaseConfig);
  global.db = firebase.firestore();
  global.firebaseRegistrado = true;
};
