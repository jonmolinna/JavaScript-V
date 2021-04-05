const form = document.querySelector('.form');
const template = document.getElementById('crud-matricula').content;
const fragment = document.createDocumentFragment();
const table = document.querySelector('.tbody');

// ---------- Eventos
form.addEventListener('submit', addMatricula);
document.addEventListener("DOMContentLoaded", road);

// ---------- Funciones
function road(){
    getMatricula();
};


function addMatricula(e){
    e.preventDefault();

    const nombre = form.name.value;
    const apellido = form.apellido.value;
    const telefono = form.telefono.value;
    const date = form.date.value;
    const newfecha = date.split('-');
    const fecha = `${newfecha[1]}/${newfecha[2]}/${newfecha[0]}`

    matricula(nombre, apellido, telefono, fecha);
};

async function matricula(nombre, apellido, telefono, fecha){
    let id = form.id.value;

    if(nombre=="" || apellido=="" || telefono==""|| fecha=="") alert('Ingrese los datos')
    
    if(!id){
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type" : "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    name: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    fecha: fecha
                })
            };
            let res = await axios("http://localhost:4000/api/matricula", options);
            await res.data;
            location.reload();
        } catch (err) {
            console.log(err)
        }

    } else {
        try {
            let options = {
                method: "PUT",
                headers: {
                    "content-type" : "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    name: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    fecha: fecha
                })
            };
            let res = await axios(`http://localhost:4000/api/matricula/${id}`, options);
            await res.data;
            location.reload();

        } catch (err) {
            console.log(err)
        }
    }

};

async function getMatricula(){
    try {
        let res = await axios.get("http://localhost:4000/api/matricula");
        let json = await res.data.data;

        json.forEach(element => {
            template.querySelector(".name").textContent = element.name;
            template.querySelector(".apellido").textContent = element.apellido;
            template.querySelector(".phone").textContent = element.telefono;
            template.querySelector(".fecha").textContent = formatFecha(element.fecha);
            template.querySelector(".btn-delit").dataset.id = element._id;
            template.querySelector(".btn-update").dataset.id = element._id;
            template.querySelector(".btn-update").dataset.name = element.name;
            template.querySelector(".btn-update").dataset.apellido = element.apellido;
            template.querySelector(".btn-update").dataset.fecha = formatFecha(element.fecha);
            template.querySelector(".btn-update").dataset.telefono = element.telefono;

            let clone = document.importNode(template, true);
            fragment.appendChild(clone)
        });

        const btnDelete = fragment.querySelectorAll('.btn-delit');
        btnDelete.forEach(elemento => {
            elemento.addEventListener('click', btnEliminar)
        });

        const editar = fragment.querySelectorAll('.btn-update');
        editar.forEach(elemento => {
            elemento.addEventListener('click', btnEditar);
        });

        table.appendChild(fragment);
    } catch (err) {
        console.log(err);
    }
};

function formatFecha(fecha){
    let date = new Date(fecha);
    let format = date.toLocaleDateString().split("/");
    let anio = format[2]
    let mes = format[1].length >= 2 ? format[1] : `0${format[1]}`;
    let day = format[0].length >= 2 ? format[0] : `0${format[0]}`;
    let anioMesDay = `${anio}-${mes}-${day}`;
    return anioMesDay;
}

async function btnEliminar(e){
    let id = e.currentTarget.dataset.id;
    let isDelete = confirm('¿Estas seguro de Eliminar?');
    
    if(isDelete){
        try {
            let options = {
                method: "DELETE",
                headers : {
                    "content-type" : "application/json; charset=utf-8"
                }
            };

            let res = await fetch(`http://localhost:4000/api/matricula/${id}`, options);
            await res.json();
            location.reload();
        } catch (err) {
            console.log(err)
        }
    }
};

function btnEditar(e){
   let id = e.currentTarget.dataset.id;
   let name = e.currentTarget.dataset.name;
   let apellido = e.currentTarget.dataset.apellido;
   let fecha = e.currentTarget.dataset.fecha;
   let telefono = e.currentTarget.dataset.telefono;

   form.id.value = id;
   form.name.value = name;
   form.apellido.value = apellido;
   form.telefono.value = telefono;
   form.date.value = fecha;
};