<template>
  <div>
    <div class="menu-list">
      <AppMenuItem 
        v-for="(item, index) in menuItems" 
        :key="index" 
        :name="item.name" 
        :description="item.description" 
        :price="item.price" 
        :image="item.image"
        @add-to-cart="addToCart(item)"
      />
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
      menuItems: [
        { name: 'Nasi Goreng', description: 'Delicious Fried Rice', price: 9, image: require('@/assets/images/Nasi-Goreng-receta.jpg') },
        { name: 'Mie Goreng', description: 'Delicious Fried Noodle', price: 10, image: require('@/assets/images/mie_goreng.jpg') },
        { name: 'Nasi Goreng', description: 'Delicious Fried Rice', price: 9, image: require('@/assets/images/Nasi-Goreng-receta.jpg') },
        { name: 'Mie Goreng', description: 'Delicious Fried Noodle', price: 10, image: require('@/assets/images/mie_goreng.jpg') },
        { name: 'Nasi Goreng', description: 'Delicious Fried Rice', price: 9, image: require('@/assets/images/Nasi-Goreng-receta.jpg') },
        { name: 'Mie Goreng', description: 'Delicious Fried Noodle', price: 10, image: require('@/assets/images/mie_goreng.jpg') },
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
.menu-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
}
</style>
