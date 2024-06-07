<template>
  <div class="p-6">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchClothes"
      placeholder="Search for clothes..."
      class="border p-2 w-full mb-4"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="clothe in filteredClothes" :key="clothe.id" class="border p-4">
        <img :src="clothe.image" :alt="clothe.name" class="w-full h-64 object-cover mb-2">
        <h2 class="font-bold">{{ clothe.name }}</h2>
        <p>{{ clothe.category }} - ${{ clothe.price }}</p>
      </div>
    </div>
    <div v-if="filteredClothes.length === 0">
      <p>No results found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClothesList',
  data() {
    return {
      searchQuery: '',
      clothes: [],
      filteredClothes: []
    };
  },
  mounted() {
    fetch('/api/clothes')
      .then(response => response.json())
      .then(data => {
        this.clothes = data;
        this.filteredClothes = data; // Display all products initially
      });
    // console.log(fetch('/api/clothes'));
  },
  methods: {
    searchClothes() {
      if (this.searchQuery.length >= 3) {
        this.filteredClothes = this.clothes.filter(clothe =>
          clothe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredClothes = this.clothes; // Display all products if search query is less than 4 characters
      }
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
