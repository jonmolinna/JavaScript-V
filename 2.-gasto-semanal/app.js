//---------------------- Variables
const form = document.querySelector('.content-form');
const nameGasto = document.getElementById('name');
const cantidadGasto = document.getElementById('cantidad');
const listaGastos = document.querySelector('.content-lists');
const mensajeAlerta = document.querySelector('.mensaje');
const presupuesto = document.getElementById('presupuesto');
const restante = document.getElementById('restante');

let presupuestoTotal = 1200;
presupuesto.textContent = presupuestoTotal;



//----------------- Eventos
form.addEventListener('submit', addPresupuesto);


//---------------- Funciones
// add presupuesto
function addPresupuesto(e){
    e.preventDefault();
    let name = nameGasto.value;
    let gasto = cantidadGasto.value;

    getGasto(gasto);

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

// funcion de Gasto
let sumaGastoTotal = 0;
function getGasto(gasto){
    gasto = parseInt(gasto);
    sumaGastoTotal = gasto + sumaGastoTotal;
    restante.textContent = presupuestoTotal - sumaGastoTotal;
}