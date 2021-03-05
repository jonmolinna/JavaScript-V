const form = document.querySelector('.container__form');
const userName = document.getElementById('user');
const passwordUser = document.getElementById('password');
const newPasswordUser = document.getElementById('nuevoPassword');
const mensaje = document.querySelector('.msg');
let usuarios = [
    {user: "brehn", password: "brehn123"},
    {user: "eung", password: "eung123"},
];

//-------------- Eventos
form.addEventListener('submit', addUsuario);


//---------------- Funciones
function addUsuario(e){
    e.preventDefault();
    let user = userName.value;
    let password = passwordUser.value;
    let newPassword = newPasswordUser.value;

    if(!user && !password && !newPassword){
        addMensaje("Ingrese los Campos", "msg__primary");
    }
    else if(!user) {
        addMensaje("Ingrese Usuario", "msg__primary");
    }
    else if(!password){
        addMensaje("Ingrese Constraseña", "msg__primary");
    }
    else if(!newPassword){
        addMensaje("Ingrese segunda Constraseña", "msg__primary");
    }
    else if(password !== newPassword){
        addMensaje("Las contraseñas no son iguales", "msg__warning");
    }
    else {
        addUserArreglo(user, password);
        addClearInputs();
        addMensaje("Usuario Registrado con Exito", "msg__success");
    }
    
};

function addUserArreglo(user, password){
    let nuevoUser = {
        user,
        password
    }

    usuarios.push(nuevoUser)
}

function addMensaje(texto, tipoMensaje){
    mensaje.textContent = texto;
    mensaje.classList.add(tipoMensaje);
    mensaje.classList.remove('none');

    setTimeout(() => {
        mensaje.textContent = '';
        mensaje.classList.remove(tipoMensaje);
        mensaje.classList.add('none');
    }, 2200);
}

function addClearInputs(){
    userName.value = "";
    passwordUser.value = "";
    newPasswordUser.value = "";
}

console.log(usuarios)