const currentDate = "2023-01-01"
const container = document.getElementById("contenedor-Cards")

let i = 0

while (i < data.events.length) {
  const event = data.events[i]
  const eventDate = new Date(event.date)
  const isFutureEvent = eventDate > new Date(currentDate)

  if (isFutureEvent) {
    // Crea la tarjeta de evento para eventos futuros
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.width = '20rem'
    card.style.height= '30rem'

    const img = document.createElement('img')
    img.src = event.image
    img.classList.add('card-img-top')
    img.alt = event.name

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = event.name

    const cardText = document.createElement('p')
    cardText.classList.add('card-text')
    cardText.textContent = event.description

    const cardFooter = document.createElement('div')
    cardFooter.classList.add('card-footer')

    const detailsLink = document.createElement('a')
    detailsLink.href = '/Assets/Pages/details.html'
    detailsLink.classList.add('btn', 'btn-primary')
    detailsLink.textContent = 'Details'

    const cardFooterText = document.createElement('p')
    cardFooterText.classList.add('card-footer-text')
    cardFooterText.textContent = `$${event.price.toFixed(2)}`

    cardFooter.appendChild(detailsLink)
    cardFooter.appendChild(cardFooterText)

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardFooter)

    card.appendChild(img)
    card.appendChild(cardBody)

    container.appendChild(card)
  }

  i++
}
