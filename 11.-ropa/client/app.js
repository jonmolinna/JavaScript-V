const form = document.querySelector('.form');
const template = document.getElementById('crud-ropa').content;
const fragment = document.createDocumentFragment();
const table = document.querySelector('.list-table');

// Eventos
form.addEventListener('submit', addRopa);
document.addEventListener("DOMContentLoaded", getAll);

// Funciones
async function getAll(){
    try {
        let res = await axios.get("http://localhost:4000/api/ropa");
        let json = await res.data.data;
        console.log(json)

        json.forEach(element => {
            template.querySelector(".name").textContent = element.name;
            template.querySelector(".stock").textContent = element.stock;
            template.querySelector(".precio").textContent = `S/. ${element.price}`;
            template.querySelector(".fabrica").textContent = element.fabricante;
            template.querySelector(".category").textContent = element.category;
            template.querySelector(".estado").textContent = formatEstado(element.estado);
            template.querySelector(".fecha").textContent = formatFecha(element.fecha);
            template.querySelector(".btn-delete").dataset.id = element._id;
            template.querySelector(".btn-update").dataset.id = element._id;
            template.querySelector(".btn-update").dataset.name = element.name;
            template.querySelector(".btn-update").dataset.stock = element.stock;
            template.querySelector(".btn-update").dataset.precio = element.price;
            template.querySelector(".btn-update").dataset.fabrica = element.fabricante;
            template.querySelector(".btn-update").dataset.category = element.category;
            template.querySelector(".btn-update").dataset.estado = element.estado;
            template.querySelector(".btn-update").dataset.fecha = formatFecha(element.fecha);

            let clone = document.importNode(template, true);
            fragment.appendChild(clone);
        });

        const btnDelete = fragment.querySelectorAll(".btn-delete");
        btnDelete.forEach(element => {
            element.addEventListener('click', deleteRopa);
        });

        const btnUpdate = fragment.querySelectorAll(".btn-update");
        btnUpdate.forEach(element => {
            element.addEventListener('click', updateRopa);
        });

        table.appendChild(fragment);
    } catch (err) {
        console.log(err);
    };
};

function addRopa(e){
    e.preventDefault();

    let name = form.name.value;
    let stock = form.stock.value;
    let precio = form.precio.value;
    let fabrica = form.fabrica.value;
    let category = form.category.value;
    let estado = form.estado.value;
    let fechaCompra = form.date.value;

    addRopaProduct(name, stock, precio, fabrica, category, estado, fechaCompra);    
};

async function addRopaProduct(name, stock, precio, fabrica, category, estado, fechaCompra){
    let id = form.id.value;
    
    if(!id){
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type" : "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    name : name,
                    stock : stock,
                    price : precio,
                    fabricante : fabrica,
                    category : category,
                    estado : estado,
                    fecha : fechaCompra,
                })
            };
            await axios("http://localhost:4000/api/ropa", options);
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
                    name : name,
                    stock : stock,
                    price : precio,
                    fabricante : fabrica,
                    category : category,
                    estado : estado,
                    fecha : fechaCompra,
                })
            };
            await axios(`http://localhost:4000/api/ropa/${id}`, options);
            location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    
};

async function deleteRopa(e){
    let id = e.currentTarget.dataset.id;
    let confirmado = confirm('¿Estas seguro de eliminar?')
    if(confirmado){
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "content-type" : "application/json; charset=utf-8"
                }
            };
            await fetch(`http://localhost:4000/api/ropa/${id}`, options);
            location.reload();
        } catch (err) {
            console.log(err);
        }
    } 
};

function updateRopa(e){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let stock = e.currentTarget.dataset.stock;
    let precio = e.currentTarget.dataset.precio;
    let fabrica = e.currentTarget.dataset.fabrica;
    let categoria = e.currentTarget.dataset.category;
    let estado = e.currentTarget.dataset.estado;
    let fecha = e.currentTarget.dataset.fecha;

    form.id.value = id;
    form.name.value = name;
    form.stock.value = stock;
    form.precio.value = precio;
    form.fabrica.value = fabrica;
    form.category.value = categoria;
    form.estado.value = estado;
    form.date.value = fecha

    console.log(id, name, stock, precio, fabrica, categoria, estado, fecha)
};

function formatEstado(estado){
    if(estado === true) return 'Disponible';
    if(estado === false) return 'No Disponible';
};

function formatFecha(date){
    let fecha = new Date(date);
    let fechaHumana = fecha.toLocaleDateString();
    let arreglo = fechaHumana.split("/");
    let anio = arreglo[2];
    let mes = ""
    if(arreglo[1].length === 2){
        mes = arreglo[1]
    } else {
        mes = `0${arreglo[1]}`;
    }
    let day = "";
    if(arreglo[0].length === 2){
        day = arreglo[0];
    } else {
        day = `0${arreglo[0]}`;
    }

    return `${anio}-${mes}-${day}`;
};