import { crearBuscador, filtrarYMostrar, filtrarCheck, imprimirCards, imprimirCheck } from "./Modules/Funciones.js"

const api = "https://mindhub-xj03.onrender.com/api/amazing"
let data = []

const $contenedorCheck = document.getElementById("contenedorCheck")
const $contenedorBuscador = document.getElementById("contenedorBuscador")
const $contenedorCards = document.getElementById("contenedorCards")

crearBuscador($contenedorBuscador)

fetch(api)
  .then(response => response.json())
  .then(({ events }) => {
    data = events
    imprimirCards(data, $contenedorCards)
    const categorias = [...new Set(data.map(evento => evento.category))]
    imprimirCheck($contenedorCheck, categorias)
  })
  .catch(err => console.log(err))

$contenedorCheck.addEventListener("change", () => {
  const eventosFiltrados = filtrarCheck(data, document.querySelectorAll('input[type="checkbox"]:checked'))
  imprimirCards(eventosFiltrados, $contenedorCards)
})

const $inputBuscador = document.getElementById('buscador')
$inputBuscador.addEventListener('input', () => {
  filtrarYMostrar(data, $inputBuscador.value.toLowerCase(), $contenedorCards);
})