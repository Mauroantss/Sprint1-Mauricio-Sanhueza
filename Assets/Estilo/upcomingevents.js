import { crearBuscador, filtrarYMostrar, filtrarCheck, imprimirCards, imprimirCheck, filtrarEventosPasados, filtrarEventosFuturos } from "./Modules/Funciones.js"

const api = "https://mindhub-xj03.onrender.com/api/amazing"
let data = []
let dataPasada = []
let dataFutura = []

const $contenedorCheck = document.getElementById("contenedorCheck")
const $contenedorBuscador = document.getElementById("contenedorBuscador")
const $contenedorCards = document.getElementById("contenedorCards")

crearBuscador($contenedorBuscador)

fetch(api)
  .then(response => response.json())
  .then(({ events }) => {
    data = events
    dataPasada = filtrarEventosPasados(data)
    dataFutura = filtrarEventosFuturos(data)
    imprimirCards(dataFutura, $contenedorCards)
    const categorias = [...new Set(dataFutura.map(evento => evento.category))]
    imprimirCheck($contenedorCheck, categorias)
  })
  .catch(err => console.log(err))

$contenedorCheck.addEventListener("change", () => {
  const eventosFiltrados = filtrarCheck(dataFutura, document.querySelectorAll('input[type="checkbox"]:checked'))
  imprimirCards(eventosFiltrados, $contenedorCards)
})

const $inputBuscador = document.getElementById('buscador')
$inputBuscador.addEventListener('input', () => {
  filtrarYMostrar(dataFutura, $inputBuscador.value.toLowerCase(), $contenedorCards)
})