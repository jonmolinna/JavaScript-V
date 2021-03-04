const form = document.querySelector('.container__form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productYear = document.getElementById('product-year');
const listProducts = document.querySelector('.container__right');
const mensaje = document.querySelector('.mensaje');

// Eventos
form.addEventListener('submit', addProduct);
//window.addEventListener("DOMContentLoaded", listProduct);

//---------------------- Funciones
// add Product
function addProduct(e){
    e.preventDefault();
    const name = productName.value;
    const price = productPrice.value;
    const year = productYear.value;
    const id = new Date().getTime().toString();
    
    listProduct(name, price, year, id);
    setMensaje("Producto Agregado con Exito", "message__success");
    setClear();
}

// Lista Products
function listProduct(name, price, year, id){
    const element = document.createElement('article');
    element.classList.add('container__list');

    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `
        <article class="container__details">
            <p><strong>Produc Name:</strong> ${name}</p>
            <p><strong>Produc Price:</strong> ${price}</p>
            <p><strong>Produc Year:</strong> ${year}</p>
        </article>
        <button class="btn btn-delete">Delete</button>
    `;
    listProducts.appendChild(element);
    
    const btnDelete = element.querySelector('.btn-delete');
    btnDelete.addEventListener('click', deleteProduct);
}

// clear text
function setClear(){
    productName.value = "";
    productPrice.value = "";
    productYear.value = "";
}

// Mensaje
function setMensaje(texto, tipo){
    mensaje.textContent = texto;
    mensaje.classList.add(tipo);
    mensaje.classList.remove("none");

    setTimeout(() => {
        mensaje.classList.add("none");
        mensaje.classList.remove(tipo);
    }, 2000);
}


// delete product
function deleteProduct(e){
    const element = e.currentTarget.parentElement;
    listProducts.removeChild(element);

    const id = element.dataset.id;
    console.log(id)

    setMensaje("Producto Eliminado con Exito", "message__delete");
    console.log('click');
}