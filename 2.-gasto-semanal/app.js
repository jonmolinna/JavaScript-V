//---------------------- Variables
const form = document.querySelector('.content-form');
const nameGasto = document.getElementById('name');
const cantidadGasto = document.getElementById('cantidad');
const listaGastos = document.querySelector('.content-lists');
const mensajeAlerta = document.querySelector('.mensaje');

//----------------- Eventos
form.addEventListener('submit', addPresupuesto);


//---------------- Funciones
// add presupuesto
function addPresupuesto(e){
    e.preventDefault();
    let name = nameGasto.value;
    let gasto = cantidadGasto.value;

    const element = document.createElement('div');

    element.innerHTML = `
        <article class="content-list">
            <span class="content-list-detail">${name}</span>
            <span class="content-list-price">$ ${gasto}</span>
        </article>
    `;

    listClear();
    displayAlert();
    listaGastos.appendChild(element);
}

// limpieza
function listClear(){
    nameGasto.value = "";
    cantidadGasto.value = "";
}

// Mensaje de Alerta
function displayAlert(){
    mensajeAlerta.classList.remove("none")

    setTimeout(() => {
        mensajeAlerta.classList.add("none")
    }, 2000);
}