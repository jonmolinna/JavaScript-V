const container = document.querySelector('.container');
const btnRight = document.querySelector('.right');
const btnLeft = document.querySelector('.left');
let numero = 1;

btnRight.addEventListener('click', e => {
    if(numero == 1){
        numero = numero + 1
    } else {
        numero = 1
    }
    getData();
});

btnLeft.addEventListener('click', e => {
    if(numero == 2){
        numero = 1
    } else {
        numero = numero + 1
    }
    getData();
});

async function getData(){
    //console.log(numero)
    try {
        let res = await axios.get(`https://reqres.in/api/users?page=${numero}`);
        let json = await res.data.data;

        container.innerHTML = "";

        json.forEach(element => {
            container.innerHTML += `
                <div class="card">
                <div class="imagen">
                    <img src=${element.avatar} alt="">
                </div>
                <section class="details">
                    <h2>Nombres: ${element.first_name} </h2>
                    <h2>Apellidos: ${element.last_name}</h2>
                    <h2>Email: ${element.email} </h2>
                </section>
                </div>
            `;
        })

    } catch (err) {
        let message = err.response.statusText || "Ocurio un Error";
    }
}

getData()