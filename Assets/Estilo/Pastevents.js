import { crearBuscador, filtrarYMostrar, filtrarCheck, imprimirCards, imprimirCheck, filtrarEventosPasados } from "./Modules/Funciones.js"

const api = "https://mindhub-xj03.onrender.com/api/amazing"
let data = []
let dataPasada = []

const $contenedorCheck = document.getElementById("contenedorCheck")
const $contenedorBuscador = document.getElementById("contenedorBuscador")
const $contenedorCards = document.getElementById("contenedorCards")

crearBuscador($contenedorBuscador)

fetch(api)
  .then(response => response.json())
  .then(({ events }) => {
    data = events
    dataPasada = filtrarEventosPasados(data)
    imprimirCards(dataPasada, $contenedorCards) // Ahora muestra solo eventos pasados
    const categorias = [...new Set(dataPasada.map(evento => evento.category))]
    imprimirCheck($contenedorCheck, categorias)
  })
  .catch(err => console.log(err))

$contenedorCheck.addEventListener("change", () => {
  const eventosFiltrados = filtrarCheck(dataPasada, document.querySelectorAll('input[type="checkbox"]:checked'))
  imprimirCards(eventosFiltrados, $contenedorCards)
});

const $inputBuscador = document.getElementById('buscador')
$inputBuscador.addEventListener('input', () => {
  filtrarYMostrar(dataPasada, $inputBuscador.value.toLowerCase(), $contenedorCards)
})
