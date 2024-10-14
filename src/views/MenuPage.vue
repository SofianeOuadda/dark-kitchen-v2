<template>
  <div>
    <!-- Tableau pour Nasi Goreng -->
    <div class="menu-section">
      <h2>Nasi Goreng</h2>
      <div class="menu-list">
        <AppMenuItem 
          v-for="(item, index) in nasiGorengItems" 
          :key="index" 
          :name="item.name" 
          :description="item.description" 
          :price="item.price" 
          :image="item.image"
          @add-to-cart="addToCart(item)"
        />
      </div>
    </div>

    <!-- Tableau pour Mie Goreng -->
    <div class="menu-section">
      <h2>Mie Goreng</h2>
      <div class="menu-list">
        <AppMenuItem 
          v-for="(item, index) in mieGorengItems" 
          :key="index" 
          :name="item.name" 
          :description="item.description" 
          :price="item.price" 
          :image="item.image"
          @add-to-cart="addToCart(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>

import AppMenuItem from '@/components/AppMenuItem.vue';

export default {
  name: 'MenuPage',
  components: {
    AppMenuItem
  },
  props: {
    cartItems: Array
  },
  data() {
    return {
      nasiGorengItems: [
        { name: 'Egg Nasi Goreng', description: 'Delicious Fried Rice with fried egg', price: 9, image: require('@/assets/images/Nasi-Goreng-receta.jpg') },
        { name: 'Chicken Nasi Goreng', description: 'Delicious Fried Rice with chicken', price: 10, image: require('@/assets/images/nasi-goreng-poulet.jpeg') },
        { name: 'Sea food Nasi Goreng', description: 'Delicious Fried Rice with fish, calamari and prawns', price: 11, image: require('@/assets/images/nasi-goreng-seafood.jpg') }
      ],
      mieGorengItems: [
        { name: 'Egg Mie Goreng', description: 'Delicious Fried Noodles with fried egg', price: 9, image: require('@/assets/images/miegoreng-egg.jpg') },
        { name: 'Chicken Mie Goreng', description: 'Delicious Fried Noodles with chicken', price: 10, image: require('@/assets/images/mie_goreng.jpg') },
        { name: 'Sea food Mie Goreng', description: 'Delicious Fried Noodles with fish, calamari and prawns', price: 11, image: require('@/assets/images/miegoreng-crevettes.jpg') }
      ]
    };
  },
  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', item);
    }
  }
}
</script>

<style scoped>
.menu-section {
  margin-bottom: 4rem; /* Espace entre les deux sections */
}

.menu-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.menu-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Garde la disposition en grille */
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
}

.menu-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
