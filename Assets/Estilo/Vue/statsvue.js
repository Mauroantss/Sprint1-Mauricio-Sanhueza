const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      events: [],
      currentDate: '',
      searchText: '',
      categories: [],
      selectedCategories: []
    };
  },
  computed: {
    pastEvents() {
      return this.events.filter((evento) => new Date(evento.date) < new Date(this.currentDate));
    },
    futureEvents() {
      return this.events.filter((evento) => new Date(evento.date) >= new Date(this.currentDate));
    },
    mayorAsistencia() {
      if (!this.pastEvents.length) return null;
      return this.pastEvents.reduce((max, evento) => {
        const currentPorcentaje = this.calcularPorcentaje(evento, 'assistance');
        const maxPorcentaje = this.calcularPorcentaje(max, 'assistance');
        return currentPorcentaje > maxPorcentaje ? evento : max;
      }, this.pastEvents[0]);
    },
    menorAsistencia() {
      if (!this.pastEvents.length) return null;
      return this.pastEvents.reduce((min, evento) => {
        const currentPorcentaje = this.calcularPorcentaje(evento, 'assistance');
        const minPorcentaje = this.calcularPorcentaje(min, 'assistance');
        return currentPorcentaje < minPorcentaje ? evento : min;
      }, this.pastEvents[0]);
    },
    mayorCapacidad() {
      if (!this.events.length) return null;
      return this.events.reduce((max, evento) => {
        return evento.capacity > max.capacity ? evento : max;
      }, { capacity: 0 });
    },
    pastCategoriesStats() {
      const stats = this.generateCategoryStats(this.pastEvents, 'assistance');
      for (const category in stats) {
        stats[category].totalRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats[category].totalRevenue);
      }
      return stats;
    },
    futureCategoriesStats() {
      const stats = this.generateCategoryStats(this.futureEvents, 'estimate');
      for (const category in stats) {
        stats[category].totalRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats[category].totalRevenue);
      }
      return stats;
    },
    porcentajeMayorAsistencia() {
      if (!this.mayorAsistencia) return 0;
      return this.calcularPorcentaje(this.mayorAsistencia, 'assistance');
    },
    porcentajeMenorAsistencia() {
      if (!this.menorAsistencia) return 0;
      return this.calcularPorcentaje(this.menorAsistencia, 'assistance');
    },
  },
  methods: {
    fetchData() {
      const api = "https://mindhub-xj03.onrender.com/api/amazing";
      fetch(api)
        .then(response => response.json())
        .then(({ events, currentDate }) => {
          this.events = events;
          this.currentDate = currentDate;
          this.categories = [...new Set(events.map(event => event.category))];
        })
        .catch(err => console.log(err));
    },
    calcularPorcentaje(evento, key) {
      const assistance = parseFloat(evento[key]);
      const capacity = parseFloat(evento.capacity);
      if (!isNaN(assistance) && !isNaN(capacity) && capacity !== 0) {
        return Math.min(100, (assistance / capacity) * 100);
      }
      return 0;
    },
    generateCategoryStats(events, key) {
      return events.reduce((acc, evento) => {
        if (!acc[evento.category]) {
          acc[evento.category] = { totalRevenue: 0, totalAttendance: 0, eventCount: 0 };
        }

        const price = parseFloat(evento.price);
        const assistance = parseFloat(evento[key]);

        if (!isNaN(price) && !isNaN(assistance)) {
          acc[evento.category].totalRevenue += price * assistance;
        }

        const porcentaje = this.calcularPorcentaje(evento, key);
        if (!isNaN(porcentaje)) {
          acc[evento.category].totalAttendance += porcentaje;
        }

        acc[evento.category].eventCount++;
        return acc;
      }, {});
    }
  },
  mounted() {
    this.fetchData();
  }
}).mount('#app');
