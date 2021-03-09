const form = document.querySelector('.form');
const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productCategory = document.getElementById('category');
const productStock = document.getElementById('stock');
const btnAdd = document.querySelector('.btn-add');
const productList = document.querySelector('.tbody');
const mensaje = document.querySelector('.msg');

let products = [];
let idProduct = 0;

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

    if(idProduct === 0){
        listProduct(id,nameProduct,priceProduct,categoryProduct,stockProduct);
        addMensaje("Producto Agregado con Exito", "msg__success");
        clearInput();
    } else {
        listProduct(idProduct,nameProduct,priceProduct,categoryProduct,stockProduct);
        addMensaje("Producto Actualizado con Exito", "msg__secondary");
        clearInput();
    }

    
}

//List Product
function listProduct(id, name, price, category, stock){
    let newProducts = {id, name, price, category, stock}
    products.push(newProducts);

    const element = document.createElement('tr');
    const idData = document.createAttribute("data-id");
    const nameData = document.createAttribute("data-name");
    const priceData = document.createAttribute("data-price");
    const categoryData = document.createAttribute("data-category");
    const stockData = document.createAttribute("data-stock");
    idData.value = id
    nameData.value = name;
    priceData.value = price;
    categoryData.value = category;
    stockData.value = stock;

    element.setAttributeNode(idData);
    element.setAttributeNode(nameData);
    element.setAttributeNode(priceData);
    element.setAttributeNode(categoryData);
    element.setAttributeNode(stockData);

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

    console.log(element)

    productList.appendChild(element);
    const btnEliminar = element.querySelector('.btn-delete');
    btnEliminar.addEventListener('click', deleteProduct);
    
    const btnEditar = element.querySelector('.btn-edit');
    btnEditar.addEventListener("click", editProduct);
}

// delete Product
function deleteProduct(e){
    let elemento = e.currentTarget.parentElement.parentElement;
    const confirmado = confirm('¿Estas seguro de eliminar?');

    let id = elemento.dataset.id;

    if(confirmado){
        productList.removeChild(elemento);
        addMensaje("Producto Eliminado con Exito", "msg__primary");
    }

    //products.filter(product => product.id != id);
    //console.log(products);
    //products.push(newProducts);
}

// edit Product
function editProduct(e){
    let elemento = e.currentTarget.parentElement.parentElement;

    let id = elemento.dataset.id;
    let name = elemento.dataset.name;
    let price = elemento.dataset.price;
    let category = elemento.dataset.category;
    let stock = elemento.dataset.stock;

    productName.value = name;
    productPrice.value = price;
    productCategory.value = category;
    productStock.value = stock;
    btnAdd.textContent = "Actualizar";

    idProduct = id;
    console.log(idProduct);

    //console.log(id, name, price, category, stock);
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