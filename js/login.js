function Usuario(usuario, password) {
  this.usuario = usuario;
  this.password = password;
}

const ingreso = document.querySelectorAll("input");
const inputUser = ingreso[0];
const inputPassword = ingreso[1];
const check = ingreso[2];
const btnIngresar = ingreso[3];
const formLogin = document.querySelector("#form-login");

fetch("./db/db.json")
  .then((res) => res.json())
  .then((data) => {
    const { arrayDeUsuarios } = data;

    //Verifica si hay credenciales almacenadas de la última sesión
    const credenciales = JSON.parse(localStorage.getItem("credenciales")) || [];

    //FORMULARIO DE INGRESO
    //Permitir el ingreso de usuarios con datos coincidentes con los almacenados en el array o en el local storage

    function controlarIngreso(usu, pass) {
      let usuarioEncontrado = arrayDeUsuarios.find((el) => el.usuario == usu);
      let usuarioValidado =
        usuarioEncontrado && usuarioEncontrado.password == pass;
      if (usuarioValidado == true) {
        guardarEnStorage(check.checked);
      }
      return usuarioValidado;
    }

    //La función guardarEnStorage tiene por parámetro una variable booleana que vale true si el usuario seleccionó "recordar" contraseña y false de otra manera. En el primer caso almacena credenciales en local storage, en el segundo almacena en session
    function guardarEnStorage(recordarPass) {
      const credenciales = {
        usuario: inputUser.value,
        pass: inputPassword.value,
      };
      const credEnJson = JSON.stringify(credenciales);
      recordarPass
        ? localStorage.setItem("credenciales", credEnJson)
        : sessionStorage.setItem("credenciales", credEnJson);
    }

    formLogin.addEventListener("submit", (event) => {
      let usuarioValidado = controlarIngreso(
        inputUser.value,
        inputPassword.value
      );
      usuarioValidado == true
        ? Swal.fire({
            title: "Bienvenido " + `${inputUser.value}`,
            icon: "success",
            type: "success",
          }).then(function () {
            location.href = "./service.html";
          })
        : Swal.fire("Credenciales incorrectas");
      event.preventDefault();
    });
  });
