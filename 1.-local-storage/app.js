const form = document.querySelector('.form');
const tweet = document.getElementById('tweet');
const listTweet = document.querySelector('.list-content');

// Eventos
form.addEventListener('submit', addItem);
window.addEventListener("DOMContentLoaded", ListarTweets);


// Funciones
function addItem(e){
    e.preventDefault();
    const item = tweet.value;
    const id = new Date().getTime().toString();

    createListItem(id, item);
    addToLocalStorage(id, item);
    clearItem();
}


function createListItem(id, item){
    const elemnt = document.createElement('p');
    elemnt.classList.add('list-contenido')
    const attr = document.createAttribute('data-id');
    attr.value = id;
    elemnt.setAttributeNode(attr)
    elemnt.innerHTML = `
        <span>${item}</span> 
        <span class="btn btn-delete">X</span>
    `;

    const deleteBtn = elemnt.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', deleteItem);
    listTweet.appendChild(elemnt);
};

function clearItem(){
    tweet.value = "";
}

// Agregando a Local Storage
function addToLocalStorage(id, value){
    const lista = {id, value};
    let items = getLocalStorage();
    items.push(lista);
    localStorage.setItem("tweet", JSON.stringify(items));
}

// Listando
function ListarTweets(){
    let tweets = getLocalStorage();
    if(tweets.length > 0){
        tweets.forEach(item => {
            createListItem(item.id, item.value)
        });
    }
}

function getLocalStorage(){
    return localStorage.getItem("tweet")? JSON.parse(localStorage.getItem('tweet')) : []
}

// Eliminando
function deleteItem(e){
    const element = e.currentTarget.parentElement;
    const id = element.dataset.id;
    listTweet.removeChild(element);
    removeFromLocalStorage(id);
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
     items = items.filter(item => item.id !== id);
     localStorage.setItem("tweet", JSON.stringify(items));
}