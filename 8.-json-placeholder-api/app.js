const lista = document.querySelector('.list');

async function getData(){
    try {
        let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        let json = await res.data;
        lista.innerHTML = "";
        json.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element.title}`;
            lista.appendChild(li);
        });

    } catch (err) {
        //console.log(err.response)
        let message = err.response.statusText || "Ocurrio un Error";
        lista.innerHTML = `Error ${err.response.status} : ${message}`;
    }
};

getData();