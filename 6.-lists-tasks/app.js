const form = document.querySelector(".form");
const nameTarea = document.getElementById("tarea");
const optionTarea = document.getElementById("option");
const listTodo = document.querySelector('.list-tasks');
const countGeneral = document.getElementById('numGeneral');
const countCasa = document.getElementById('numCasa');
const countTrabajo = document.getElementById('numTrabajo');

let todos = [
    {id: "123456789", name: "Hola a todos", option: "General", complit: true},
    {id: "982345789", name: "Debo programar", option: "Casa", complit: false},
    {id: "6743589782", name: "Debo Limpiar", option: "Trabajo", complit: false},
    {id: "578945693", name: "Debo ducharme", option: "Casa", complit: true},
];

//------------ Eventos
document.addEventListener("DOMContentLoaded", e => {
    refreshUI();
});

form.addEventListener('submit', addTodo);


//------------- Funciones
// funcion de refresh
function refreshUI(){
    listTodos();
    countTodo();
    deleteTodos();
};

// funcion de listar
function listTodos(){
    listTodo.innerHTML = "";
    todos.forEach(todo => {
        listTodo.innerHTML += `
        <div class="task">
            <p>
                <input type="checkbox" class="check" ${todo.complit? 'checked="checked"' : ''}}>
                ${todo.name}
            </p>
            <span id="delete" data-id=${todo.id}>X</span>
        </div>
        `        
    });
}

// funcions de addTodo
function addTodo(e){
    e.preventDefault();

    let id = new Date().getTime().toString();
    let name = nameTarea.value;
    let option = optionTarea.value;
    let complit = false;

    todos.push({id, name, option, complit})
    refreshUI();
    addClear();
}

// funcion Clear
function addClear(){
    nameTarea.value = "";
    optionTarea.value = "";
}

// funcion contar Tareas
function countTodo(){
    let general = todos.filter(todo => todo.option === "General");
    countGeneral.textContent = `${general.length} Tareas`;
    
    let casa = todos.filter(todo => todo.option === "Casa");
    countCasa.textContent = `${casa.length} Tareas`;

    let trabajo = todos.filter(todo => todo.option === "Trabajo");
    countTrabajo.textContent = `${trabajo.length} Tareas`;
}

// funciont delete
function deleteTodos(){
    document.querySelectorAll('#delete').forEach(item =>{
        item.addEventListener('click', e => {
            let id = item.dataset.id;
            let nuevoArreglo = todos.filter(elemet => elemet.id !== id);
            todos = nuevoArreglo;
            refreshUI();
        })
    })   
}