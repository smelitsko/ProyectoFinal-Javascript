//LA BASE DE USUARIOS ESTA ALMACENADA EN LOCAL STORAGE; SI TODAVIA NO HAY USUARIOS SE INICIA VACIA
const arrayDeUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//FUNCION CONTSTRUCTURA
function Usuario(usuario, password) {
  this.usuario = usuario;
  this.password = password;
}

//SEECCIONO BOTONES E INPUT
const ingreso = document.querySelectorAll("input");
const inputUser = ingreso[0];
const inputPassword = ingreso[1];
const btnIngresar = ingreso[2];
const formRegister = document.querySelector("#form-register");

//FUNCIONES QUE DEVUELVEN TRUE OR FALSE SEGUN EL NOMBRE/PASS SEA VALIDO
function validarNuevoUsuario(usu) {
  return usu.length >= 8;
}

function validarNuevaPassword(pass) {
  let numeroPresente = false;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] >= 0) {
      numeroPresente = true;
      break;
    }
  }
  return pass.length >= 8 && numeroPresente;
}

// SI EL USUARIO Y PASS SON VALIDOS, VA A ALMACENAR NUEVO USUARIO EN EL ARRAY DE LS E IR A LOGIN
function agregarNuevoUsuario(usu, pass) {
  if (validarNuevoUsuario(usu) && validarNuevaPassword(pass)) {
    let nuevoUsuario = new Usuario(usu, pass);
    arrayDeUsuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(arrayDeUsuarios));
    Swal.fire({
      title: "Bienvenido " + `${usu}`,
      icon: "success",
      type: "success",
    }).then(function () {
      location.href = "./service.html";
    });
  } else {
    Swal.fire("El usuario y/o password no cumplen con las condiciones");
  }
}

formRegister.addEventListener("submit", (event) => {
  agregarNuevoUsuario(inputUser.value, inputPassword.value);
  event.preventDefault();
});
