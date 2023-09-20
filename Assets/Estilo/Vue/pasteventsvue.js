const { createApp } = Vue;

const pastEventsApp = createApp({
  data() {
    return {
      events: [],
      searchText: '',
      categories: [],
      selectedCategories: []
    };
  },
  computed: {
    filteredPastEvents() {
      let filtered = [...this.events];
      const now = new Date();

      // Filtrar eventos pasados por fecha
      filtered = filtered.filter(event => new Date(event.date) < now);

      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(event => this.selectedCategories.includes(event.category));
      }

      if (this.searchText !== '') {
        filtered = filtered.filter(event => event.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }

      return filtered;
    }
  },
  methods: {
    fetchData() {
      const api = "https://mindhub-xj03.onrender.com/api/amazing";
      fetch(api)
        .then(response => response.json())
        .then(({ events }) => {
          this.events = events;
          this.categories = [...new Set(events.map(event => event.category))];
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.fetchData();
  }
}).mount('#app');
