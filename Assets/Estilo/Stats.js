// Función para calcular el porcentaje de asistencia en un evento
function calcularPorcentaje(evento) {
  return evento.capacity ? (evento.assistance / evento.capacity) * 100 : 0
}

// URL de la API desde donde se obtendrán los datos de los eventos
let api = "https://mindhub-xj03.onrender.com/api/amazing"

// Realizar la solicitud HTTP a la API
fetch(api)
.then((resultado) => resultado.json()) // Convertir la respuesta a formato JSON
.then(({ events, currentDate }) => { // Desestructurar el objeto devuelto por la API
  // Filtrar los eventos pasados
  let pastEvents = events.filter((evento) => evento.date < currentDate)
  // Filtrar los eventos futuros
  let futureEvents = events.filter((evento) => evento.date >= currentDate)

  // Calcular las estadísticas de los eventos pasados
  const pastCategoriesStats = pastEvents.reduce((acc, evento) => {
    if (!acc[evento.category]) {
      acc[evento.category] = { totalRevenue: 0, totalAttendance: 0, eventCount: 0 }
    }
    acc[evento.category].totalRevenue += (Number(evento.price) * evento.assistance)
    acc[evento.category].totalAttendance += calcularPorcentaje(evento)
    acc[evento.category].eventCount++
    return acc
  }, {})

  // Determinar el evento pasado con mayor asistencia
  const mayorAsistencia = pastEvents.length ? pastEvents.reduce((max, evento) => {
    return calcularPorcentaje(evento) > calcularPorcentaje(max) ? evento : max
  }, pastEvents[0]) : null

  // Determinar el evento pasado con menor asistencia
  const menorAsistencia = pastEvents.length ? pastEvents.reduce((min, evento) => {
    return calcularPorcentaje(evento) < calcularPorcentaje(min) ? evento : min
  }, pastEvents[0]) : null

  // Determinar el evento con mayor capacidad
  const mayorCapacidad = events.reduce((max, evento) => {
    return evento.capacity > max.capacity ? evento : max
  }, { capacity: 0 })

  // Calcular las estadísticas de los eventos futuros
  const futureCategoriesStats = futureEvents.reduce((acc, evento) => {
    if (!acc[evento.category]) {
      acc[evento.category] = { totalRevenue: 0, totalAttendance: 0, eventCount: 0 }
    }
    acc[evento.category].totalRevenue += (Number(evento.price) * evento.estimate)
    acc[evento.category].totalAttendance += evento.estimate
    acc[evento.category].eventCount++
    return acc
  }, {})

  // Llamar a la función para crear la tabla de estadísticas
  crearTabla(mayorAsistencia, menorAsistencia, mayorCapacidad, futureCategoriesStats, pastCategoriesStats)
})
.catch((err) => console.log(err)); // Capturar y registrar cualquier error

// Función para crear la tabla HTML con las estadísticas
function crearTabla(mayorAsistencia, menorAsistencia, mayorCapacidad, futureCategoriesStats, pastCategoriesStats) {
const contenedorTable = document.getElementById("contenedorTable")

// En la función crearTabla, puedes modificar la línea donde se muestra 'stats.totalRevenue' de la siguiente manera:

// Para eventos futuros
const futureCategoryRows = Object.keys(futureCategoriesStats).map((category) => {
    const stats = futureCategoriesStats[category];
    const avgAttendance = ((stats.eventCount * (stats.totalAttendance / 100)) ).toFixed(2);
    // Agregar el signo de dólar y puntos como separadores de miles
    const formattedRevenue = `$${stats.totalRevenue.toLocaleString('en-US')}`
    return `
      <tr>
        <td class="text-center">${category}</td>
        <td class="text-center">${formattedRevenue}</td>
        <td class="text-center">${avgAttendance}%</td>
      </tr>`;
}).join('');

// Para eventos pasados
const pastCategoryRows = Object.keys(pastCategoriesStats).map((category) => {
    const stats = pastCategoriesStats[category];
    const avgAttendance = (stats.totalAttendance / (stats.eventCount)).toFixed(2)
    // Agregar el signo de dólar y puntos como separadores de miles
    const formattedRevenue = `$${stats.totalRevenue.toLocaleString('en-US')}`
    return `
      <tr>
        <td class="text-center">${category}</td>
        <td class="text-center">${formattedRevenue}</td>
        <td class="text-center">${avgAttendance}%</td>
      </tr>`;
}).join('');


const tableHTML = `
  <table class="table">
  <tr>
    <th colspan="3" class="text-center">Events Statistics</th>
  </tr>
  <tr>
    <th class="text-center">Events with highest % of assistance</th>
    <th class="text-center">Events with lowest % of assistance</th>
    <th class="text-center">Events with larger capacity</th>
  </tr>
  <tr>
    <td class="text-center">${mayorAsistencia ? mayorAsistencia.name + ' (' + calcularPorcentaje(mayorAsistencia).toFixed(2) + '%)' : 'N/A'}</td>
    <td class="text-center">${menorAsistencia ? menorAsistencia.name + ' (' + calcularPorcentaje(menorAsistencia).toFixed(2) + '%)' : 'N/A'}</td>
    <td class="text-center">${mayorCapacidad.name} (${mayorCapacidad.capacity})</td>
  </tr>
  <tr>
    <th colspan="3" class="text-center">Upcoming Events Statistics by Category</th>
  </tr>
  <tr>
    <th class="text-center">Category</th>
    <th class="text-center">Revenues</th>
    <th class="text-center">% of Attendance</th>
  </tr>
  ${futureCategoryRows}
  <tr>
    <th colspan="3" class="text-center">Past Events Statistics by Category</th>
  </tr>
  <tr>
    <th class="text-center">Category</th>
    <th class="text-center">Revenues</th>
    <th class="text-center">% of Attendance</th>
  </tr>
  ${pastCategoryRows}
  </table>
`

// Insertar el HTML de la tabla en el contenedor correspondiente
contenedorTable.innerHTML = tableHTML 
}
