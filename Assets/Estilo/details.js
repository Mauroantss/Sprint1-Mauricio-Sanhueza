// Código Details
import { crearTarjeta } from "./Modules/Funciones.js";


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


 