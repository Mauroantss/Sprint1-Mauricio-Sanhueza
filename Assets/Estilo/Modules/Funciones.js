
export function estructuraCheck(string) {
  return `
    <label class="me-2">
      <input type="checkbox" class="me-2" name="categorias" value="${string}">${string}
    </label>
  `
}

export function imprimirCheck(referenciaHtml, array) {
  let estructura = ""
  for (let categoria of array) {
    estructura += estructuraCheck(categoria)
  }
  referenciaHtml.innerHTML = estructura
}


export function crearBuscador(referenciaHtml) {
  referenciaHtml.innerHTML = `
    <form role="search">
      <input type="text" name="search" id="buscador" aria-label="Buscar">
      <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
    </form>
  `
}

export function estructuraCards(evento) {
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

export function imprimirCards(array, referenciaHtml) {
  let estructura = ""
  for (let evento of array) {
    estructura += estructuraCards(evento)
  }

  if (estructura === "") {
    estructura = "Sorry, your search did not yield any results"
  }
  referenciaHtml.innerHTML = estructura
}

export function filtrarCheck(data, checkboxes) {
  const valoresCheck = Array.from(checkboxes).map(input => input.value)

  if (valoresCheck.length === 0) {
    return data
  }

  return data.filter(evento => valoresCheck.includes(evento.category))
}

export function filtrarYMostrar(data, textoBuscado, referenciaHtml) {
  const eventosCheckFiltrados = filtrarCheck(data, document.querySelectorAll('input[type="checkbox"]:checked'))

  const eventosFiltrados = eventosCheckFiltrados.filter(evento => {
    const nombreEvento = evento.name.toLowerCase()
    return nombreEvento.includes(textoBuscado)
  });

  imprimirCards(eventosFiltrados, referenciaHtml)
}

export function filtrarEventosPasados(data) {
  const ahora = new Date()
  return data.filter(evento => new Date(evento.date) < ahora)
}
export function filtrarEventosFuturos(data) {
  const ahora = new Date()
  return data.filter(evento => new Date(evento.date) >= ahora)
}

export function crearTarjeta(tarjeta) {
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

