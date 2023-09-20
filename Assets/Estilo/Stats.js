// Función para calcular el porcentaje de asistencia en un evento
function calcularPorcentaje(evento) {
  return evento.capacity ? (evento.assistance / evento.capacity) * 100 : 0;
}

// Función para generar filas de categorías
function generateCategoryRows(categoriesStats) {
  return Object.keys(categoriesStats).map((category) => {
    const stats = categoriesStats[category];
    const avgAttendance = (stats.totalAttendance / stats.eventCount).toFixed(2);
    const formattedRevenue = `$${stats.totalRevenue.toLocaleString('en-US')}`;
    return `
      <tr>
        <td class="text-center">${category}</td>
        <td class="text-center">${formattedRevenue}</td>
        <td class="text-center">${avgAttendance}%</td>
      </tr>`;
  }).join('');
}

// URL de la API desde donde se obtendrán los datos de los eventos
const api = "https://mindhub-xj03.onrender.com/api/amazing";

// Realizar la solicitud HTTP a la API
fetch(api)
  .then((resultado) => resultado.json())
  .then(({ events, currentDate }) => {
    const pastEvents = events.filter((evento) => new Date(evento.date) < new Date(currentDate));
    const futureEvents = events.filter((evento) => new Date(evento.date) >= new Date(currentDate));

    const mayorAsistencia = pastEvents.length ? pastEvents.reduce((max, evento) => {
      return calcularPorcentaje(evento) > calcularPorcentaje(max) ? evento : max;
    }, pastEvents[0]) : null;

    const menorAsistencia = pastEvents.length ? pastEvents.reduce((min, evento) => {
      return calcularPorcentaje(evento) < calcularPorcentaje(min) ? evento : min;
    }, pastEvents[0]) : null;

    const mayorCapacidad = events.reduce((max, evento) => {
      return evento.capacity > max.capacity ? evento : max;
    }, { capacity: 0 });

    const pastCategoriesStats = pastEvents.reduce((acc, evento) => {
      if (!acc[evento.category]) {
        acc[evento.category] = { totalRevenue: 0, totalAttendance: 0, eventCount: 0 };
      }
      acc[evento.category].totalRevenue += Number(evento.price) * evento.assistance;
      acc[evento.category].totalAttendance += calcularPorcentaje(evento);
      acc[evento.category].eventCount++;
      return acc;
    }, {});

    const futureCategoriesStats = futureEvents.reduce((acc, evento) => {
      if (!acc[evento.category]) {
        acc[evento.category] = { totalRevenue: 0, totalAttendance: 0, eventCount: 0 };
      }
      acc[evento.category].totalRevenue += Number(evento.price) * evento.estimate;
      acc[evento.category].totalAttendance += evento.estimate;
      acc[evento.category].eventCount++;
      return acc;
    }, {});

    const contenedorTable = document.getElementById("contenedorTable");
  
    const futureCategoryRows = generateCategoryRows(futureCategoriesStats);
    const pastCategoryRows = generateCategoryRows(pastCategoriesStats);

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
      </table>`;

    contenedorTable.innerHTML = tableHTML;
  })
  .catch((err) => console.log(err));
