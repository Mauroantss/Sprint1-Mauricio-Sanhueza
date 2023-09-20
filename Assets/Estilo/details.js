


const api = "https://mindhub-xj03.onrender.com/api/amazing";

let parametro = location.search;
let params = new URLSearchParams(parametro);
let idEvento = params.get("parametro");

fetch(api)
  .then(response => response.json())
  .then(({ events }) => {
    let evento = events.find(evento => String(evento._id) === String(idEvento)); // Convertir a String para comparar
    if (evento) {
      let contenedorDetails = document.getElementById("contenedorDetails");
      contenedorDetails.innerHTML = crearTarjeta(evento);
    } else {
      console.log("Evento no encontrado")
    }
  })
  .catch(err => console.log(`Error: ${err}`));


  function crearTarjeta(tarjeta) {
    return `
      <div class="card w-100" style="width: 18rem;">
        <img src="${tarjeta.image}" class="card-img-top img-fluid" alt="${tarjeta.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${tarjeta.name}</h5>
          <p class="card-text"><strong>Description:</strong> ${tarjeta.description}</p>
          <p class="card-footer-text"><strong>Price:</strong> $${tarjeta.price}</p>
          <p class="card-footer-text"><strong>Place:</strong> ${tarjeta.place}</p>
          <p class="card-footer-text"><strong>Date:</strong> ${new Date(tarjeta.date).toLocaleDateString()}</p>
          <p class="card-footer-text"><strong>Category:</strong> ${tarjeta.category}</p>
        </div>
      </div>
    `;
  }
  
  