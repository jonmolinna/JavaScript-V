const listProduct = document.querySelector(".padre");
const cantFruta = document.getElementById("cantFruta");
const cantCarne = document.getElementById("cantCarne");
const cantAbarrote = document.getElementById("cantAbarrote");
const cantVerdura = document.getElementById("cantVerdura");
const form = document.querySelector('.form');

// Eventos
document.addEventListener('DOMContentLoaded', roaded);
form.addEventListener("submit", addProduct);

// Funciones
function roaded(){
    getAll();
};

// Obtener Todo
async function getAll(){
    try {
        let res = await axios.get("http://localhost:4000/api/product");
        let json = await res.data.data;
        listProduct.innerHTML = "";
        let elemento = document.createElement('div');
        elemento.classList.add("container-2");

        json.forEach(elemt => {
            elemento.innerHTML += `
            <section class="product" data-id="${elemt._id}" data-name="${elemt.name}" data-precio="${elemt.precio}" data-categoria="${elemt.categoria}">
                <p class="text-product">Nombre: ${elemt.name}</p>
                <p class="text-product">Precio: ${elemt.precio} soles</p>
                <p class="text-product">Categoria: ${elemt.categoria}</p>
                <div class="action">
                    <button class="btn btn-edit">Edit</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
            </section>
            `;
        });

        listProduct.appendChild(elemento);
        countCategoy(json);

        const btnDelete = elemento.querySelectorAll('.btn-delete');
        btnDelete.forEach(element => {
            element.addEventListener('click', deleteProduct)
        });

        const btnUpdate = elemento.querySelectorAll('.btn-edit');
        btnUpdate.forEach(elemento => {
            elemento.addEventListener('click', updateProduct)
        });

    } catch (err) {
        console.log(err)
    }
}

function countCategoy(json){
    let countFrutas = json.filter(e => e.categoria === "Frutas");
    let countCarne = json.filter(e => e.categoria === "Carne");
    let countAbarrotes = json.filter(e => e.categoria === "Abarrotes");
    let countVerduras = json.filter(e => e.categoria === "Verduras");
    
    cantFruta.textContent = `Cantidad: ${countFrutas.length}`;
    cantCarne.textContent = `Cantidad: ${countCarne.length}`;
    cantAbarrote.textContent = `Cantidad: ${countAbarrotes.length}`;
    cantVerdura.textContent = `Cantidad: ${countVerduras.length}`;
};

async function addProduct(e){
    e.preventDefault();
    let nombre = e.target.name.value;
    let precio = e.target.precio.value;
    let option = e.target.option.value;
    let id = e.target.id.value;

    if(!e.target.id.value){
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type" : "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    name: nombre,
                    precio: precio,
                    categoria: option
                })
            };
            let res = await axios("http://localhost:4000/api/product", options);
            await res.data;
            location.reload(); // Carga el product
        } catch (err) {
            console.log(err)
        }

    } else {
        try {
            let options = {
                method: "PUT",
                headers: {
                    "Content-type" : "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    name: nombre,
                    precio: precio,
                    categoria: option
                })
            };
            let res = await axios(`http://localhost:4000/api/product/${id}`, options);
            await res.data;
            location.reload();
        } catch (err) {
            console.log(err)
        }
    }
};

async function deleteProduct(e){
    let elemento = e.currentTarget.parentElement.parentElement;
    let id = elemento.dataset.id;

    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type" : "application/json; charset=utf-8"
            }
        };
        let res = await fetch(`http://localhost:4000/api/product/${id}`, options);
        await res.json();
        location.reload();
    } catch (err) {
        console.log(err)
    }
};

async function updateProduct(e){
    let elemento = e.currentTarget.parentElement.parentElement;
    let id = elemento.dataset.id;
    let nombre = elemento.dataset.name;
    let precio = elemento.dataset.precio;
    let categoria = elemento.dataset.categoria;

    form.name.value = nombre;
    form.precio.value = precio;
    form.option.value = categoria;
    form.id.value = id;
};