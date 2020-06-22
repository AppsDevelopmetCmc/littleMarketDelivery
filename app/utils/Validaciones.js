// función para validar el correo electronico
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLocaleLowerCase());
}

// función paratransformar en dos decimales
export function transformDinero(numero) {
  return Number.parseFloat(numero).toFixed(2);
}

// función pora poder eliminar la cabecera
//en los screens que se coloquen dentro de la navegación

export function navOptionHandler(isValue) {
  return { headerShown: isValue };
}
