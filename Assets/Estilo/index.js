
// Referencias Html
const $contenedorCheck = document.getElementById("contenedorCheck")
const $contenedorBuscador = document.getElementById("contenedorBuscador")
const $contenedorCards = document.getElementById("contenedorCards")



// Creacion e impresion de check

const arrayCategory = data.events.map(events => events.category)
const categoriasNorepetidas = new Set(arrayCategory)
const categorias = Array.from(categoriasNorepetidas)

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

const contenedorCheck = document.getElementById('contenedorCheck')

imprimirCheck(contenedorCheck, categorias)
function filtrarCheck() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
  const valoresCheck = Array.from(checkboxes).map(input => input.value)

  const eventosFiltrados = data.events.filter(evento => valoresCheck.includes(evento.category))
  
}


// Buscador

function crearBuscador(){
  return `
    <form role="search">
      <input type="text" name="search" id="buscador" aria-label="Buscar">
      <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
    </form>
  `
}

$contenedorBuscador.innerHTML = crearBuscador()

// Creacion e impresion de cards
function estructuraCards(events) {
  return `
    <div class="card mb-1" style="width: 18rem; height: 25rem;">
      <img src="${events.image}" class="card-img-top" alt="${events.name}" style="height: 10rem;">
      <div class="card-body">
        <h5 class="card-title text-warning">${events.name}</h5>
        <p class="card-text">${events.description}</p>
        <p class="card-footer-text">$${events.price}</p>
        <a href="./Assets/Pages/details.html?parametro=${events._id}" class="btn btn-primary">Details</a>
      </div>
    </div>
  `;
}


function imprimirCards(array, referenciaHtml) {
  let estructura = ""
  for (let evento of array) {
    estructura += estructuraCards(evento)
  }
  referenciaHtml.innerHTML = estructura
}
imprimirCards(data.events, $contenedorCards)


// Escuchar Check

$contenedorCheck.addEventListener("change", () => {
  const returnfiltrados = filtrarCheck(data)
  imprimirCards(returnfiltrados, $contenedorCards)

})


// Escuchar buscador

const $inputBuscador = document.getElementById('buscador')
$inputBuscador.addEventListener('input', function() {
  const textoBuscado = this.value
  console.log(textoBuscado)
});


// Filtro Check
function filtrarCheck(){
  
  const radioButtons = document.querySelectorAll('input[type="checkbox"]:checked')
  const valoresRadio = Array.from(radioButtons).map(input => input.value)
  const eventosFiltrados = data.events.filter(evento => valoresRadio.includes(evento.category))
  return eventosFiltrados
}

filtrarCheck()

// filtro buscador


$inputBuscador.addEventListener('input', function() {
  const textoBuscado = this.value.toLowerCase()
  const eventosFiltrados = data.events.filter(evento => evento.name.toLowerCase().includes(textoBuscado))
  mostrarCards(eventosFiltrados) 
})

function mostrarCards(eventos) {
  let estructura = ""
  for (const evento of eventos) {
    estructura += `
  <div class="card mb-1" style="width: 18rem; height: 25rem;">
  <img src="${evento.image}" class="card-img-top" alt="${evento.name}" style="height: 10rem;">
  <div class="card-body">
  <h5 class="card-title text-warning">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <p class="card-footer-text">$${evento.price}</p>
    <a href="./Assets/Pages/details.html?parametro=${eventos._id}" class="btn btn-primary">Details</a>
  </div>
  </div>
  `
  }
  $contenedorCards.innerHTML = estructura
}

// Filtros cruzados

function filtrarYMostrar() {
  const textoBuscado = $inputBuscador.value.toLowerCase(); // Obtenemos el texto buscado y lo convertimos a minúsculas
  const valoresCheck = obtenerValoresCheck() // Obtenemos los valores seleccionados en los checkboxes

  const eventosFiltrados = data.events.filter(evento => {
    const nombreEvento = evento.name.toLowerCase()// Convertimos el nombre del evento a minúsculas para hacer la comparación
    return nombreEvento.includes(textoBuscado) && (valoresCheck.length === 0 || valoresCheck.includes(evento.category))
  })

  mostrarCards(eventosFiltrados); // Mostramos las cards filtradas
}

// Función para obtener los valores seleccionados en los checkboxes
function obtenerValoresCheck() {
  const radioButtons = document.querySelectorAll('input[type="checkbox"]:checked')
  return Array.from(radioButtons).map(input => input.value)
}

// Evento para escuchar cambios en el input del buscador
$inputBuscador.addEventListener('input', filtrarYMostrar)

// Evento para escuchar cambios en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(elemento => {
  elemento.addEventListener('change', filtrarYMostrar)
})




 

 
