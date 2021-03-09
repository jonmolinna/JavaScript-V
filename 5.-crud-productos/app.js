const form = document.querySelector('.form');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productCategory = document.getElementById('category');
const productStock = document.getElementById('stock');
const btnAdd = document.querySelector('.btn-add');
const productList = document.querySelector('.tbody');
const mensaje = document.querySelector('.msg');
let products = [];

//-------------- Eventos
form.addEventListener('submit', addProduct);

//--------------- Functiones
// add Product
function addProduct(e){
    e.preventDefault();
    let id = new Date().getTime().toString();
    let nameProduct = productName.value;
    let priceProduct = productPrice.value;
    let categoryProduct = productCategory.value;
    let stockProduct = productStock.value;

    listProduct(id,nameProduct,priceProduct,categoryProduct,stockProduct);
    addMensaje("Producto Agregado con Exito", "msg__success");
    clearInput();
}

//List Product
function listProduct(id, name, price, category, stock){
    let newProducts = {id, name, price, category, stock}
    products.push(newProducts);

    const element = document.createElement('tr');
    const attr = document.createAttribute("data-id");
    attr.value = id
    element.setAttributeNode(attr);

    element.innerHTML = `
        <td>${products.length}</td>
        <td>${id}</td>
        <td>${name}</td>
        <td>$${price}</td>
        <td>${category}</td>
        <td>${stock}</td>
        <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </td>
    `;

    productList.appendChild(element);
    const btnEliminar = element.querySelector('.btn-delete');
    btnEliminar.addEventListener('click', deleteProduct);
    console.log(element)
}

// delete Product
function deleteProduct(e){
    let elemento = e.currentTarget.parentElement.parentElement;
    const confirmado = confirm('¿Estas seguro de eliminar?');

    if(confirmado){
        productList.removeChild(elemento);
        addMensaje("Producto Eliminado con Exito", "msg__primary");
    }
}

// clear Inputs
function clearInput(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productStock.value = "";
    btnAdd.textContent = "Agregar"
}

// Mensaje
function addMensaje(texto, tipo){
    mensaje.textContent = texto;
    mensaje.classList.add(tipo);
    mensaje.classList.remove('none');

    setTimeout(() => {
        mensaje.textContent = "";
        mensaje.classList.remove(tipo);
        mensaje.classList.add('none');
    }, 2200)

}