let parametro = location.search

let params = new URLSearchParams(parametro)

let idEvento = params.get("parametro")

let evento = data.events.find(evento => evento._id === idEvento)


let contenedorDetails = document.getElementById("contenedorDetails")


function crearDetails(formaCard){
    contenedorDetails.innerHTML +=
 `
 <article class="card col-12 col-md-12 col-xl-6 mx-auto">
 <h2 class="card-title text-center mt-3">${evento.name}</h2>
 <div class="card-body d-flex gap-3 flex-column text-center">
   <img class="card-img-top" src="${evento.image}" alt="${evento.image}">
   <p>Date: ${evento.date}</p>
   <p>Description: ${evento.description}</p>
   <p>Category: ${evento.category}</p>
   <p>Place: ${evento.place}</p>
   <p>Capacity: ${evento.capacity}</p>
   <p>Price: $${evento.price}</p>
 </div>
</article>

`
}
crearDetails()
