

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


 function estructuraCheck(string) {
  return `
    <label class="me-2">
      <input type="checkbox" class="me-2" name="categorias" value="${string}">${string}
    </label>
  `
}

 function imprimirCheck(referenciaHtml, array) {
  let estructura = ""
  for (let categoria of array) {
    estructura += estructuraCheck(categoria)
  }
  referenciaHtml.innerHTML = estructura
}


 function crearBuscador(referenciaHtml) {
  referenciaHtml.innerHTML = `
    <form role="search">
      <input type="text" name="search" id="buscador" aria-label="Buscar">
      <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
    </form>
  `
}

 function estructuraCards(evento) {
  return `
    <div class="card mb-1" style="width: 18rem; height: 25rem;">
      <img src="${evento.image}" class="card-img-top" alt="${evento.name}" style="height: 10rem;">
      <div class="card-body">
        <h5 class="card-title text-warning">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <p class="card-footer-text">$${evento.price}</p>
        <a href="/Assets/Pages/details.html?parametro=${evento._id}" class="btn btn-primary">Details</a>
      </div>
    </div>
  `
}

 function imprimirCards(array, referenciaHtml) {
  let estructura = ""
  for (let evento of array) {
    estructura += estructuraCards(evento)
  }

  if (estructura === "") {
    estructura = "Sorry, your search did not yield any results"
  }
  referenciaHtml.innerHTML = estructura
}

 function filtrarCheck(data, checkboxes) {
  const valoresCheck = Array.from(checkboxes).map(input => input.value)

  if (valoresCheck.length === 0) {
    return data
  }

  return data.filter(evento => valoresCheck.includes(evento.category))
}

 function filtrarYMostrar(data, textoBuscado, referenciaHtml) {
  const eventosCheckFiltrados = filtrarCheck(data, document.querySelectorAll('input[type="checkbox"]:checked'))

  const eventosFiltrados = eventosCheckFiltrados.filter(evento => {
    const nombreEvento = evento.name.toLowerCase()
    return nombreEvento.includes(textoBuscado)
  });

  imprimirCards(eventosFiltrados, referenciaHtml)
}

 function filtrarEventosPasados(data) {
  const ahora = new Date()
  return data.filter(evento => new Date(evento.date) < ahora)
}
 function filtrarEventosFuturos(data) {
  const ahora = new Date()
  return data.filter(evento => new Date(evento.date) >= ahora)
}

