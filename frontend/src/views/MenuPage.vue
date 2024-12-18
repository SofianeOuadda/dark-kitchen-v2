<template>
  <div class="menu-page">
    <h2>Notre Menu</h2>
    <div v-if="loading" class="loader">Chargement des produits...</div>
    <div v-else>
      <div class="menu-section">
        <h3>Nos recettes de Nasi Goreng</h3>
        <div class="products-grid">
          <AppMenuItem 
            v-for="product in nasiGorengItems" 
            :key="product._id" 
            :name="product.name" 
            :description="product.description" 
            :price="product.price" 
            :image="product.image"
            @add-to-cart="addToCart(product)"
          />
        </div>
      </div>

      <div class="menu-section">
        <h3>Nos recettes de Mie Goreng</h3>
        <div class="products-grid">
          <AppMenuItem 
            v-for="product in mieGorengItems" 
            :key="product._id" 
            :name="product.name" 
            :description="product.description" 
            :price="product.price" 
            :image="product.image"
            @add-to-cart="addToCart(product)"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import AppMenuItem from '@/components/AppMenuItem.vue';
import api from '@/services/api';

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

      products: [],
      loading: false,

    };
  },
  computed: {
    
    nasiGorengItems() {
      return this.products.filter(item => item.category === 'Nasi Goreng');
    },
    
    mieGorengItems() {
      return this.products.filter(item => item.category === 'Mie Goreng');
    }
  },
  mounted() {
    this.fetchProducts(); 
  },
  methods: {
    async fetchProducts() {

      this.loading = true;
      try {
        const response = await api.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error(error);
        alert('Erreur lors du chargement des produits');
      } finally {
        this.loading = false;

      }
    },
    addToCart(item) {
      this.$emit('add-to-cart', item);
    },
    formatPrice(price) {
      return `${price} €`;
    },
  },
  created() {
    this.fetchProducts();
  },

};

</script>

<style scoped>
.menu-page {
  padding: 20px;
  text-align: center;
}

.menu-page h2 {
  font-size: 2.5rem; 
  font-weight: bold;
  color: #b98342; 
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
}

.loader {
  font-size: 1.2rem;
  color: #555;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
}

.product-card {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: auto;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.product-name {
  font-size: 1.2rem;
  margin: 10px 0 5px 0;
  color: #333;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #b98342;
  margin: 10px 0;
}

.add-to-cart-btn {
  background-color: #b98342;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #ff7f00;
}

.menu-section {
  margin-bottom: 40px;
}

.menu-section h3 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #333; 
  border-bottom: 2px solid #333; 
  display: inline-block; 
  margin: 2rem 0 1rem 0; 
  padding-bottom: 0.5rem;
}
</style>