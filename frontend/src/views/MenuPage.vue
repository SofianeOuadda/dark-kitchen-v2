<template>
  <div class="menu-page">
    <h2>Notre Menu</h2>
    <div v-if="loading" class="loader">Chargement des produits...</div>
    <div v-else class="products-grid">
      <AppMenuItem 
        v-for="product in products" 
        :key="product._id" 
        :name="product.name" 
        :description="product.description" 
        :price="product.price" 
        :image="product.image"
        @add-to-cart="addToCart(product)"
      />
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

.loader {
  font-size: 1.2rem;
  color: #555;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

.product-description {
  font-size: 0.9rem;
  color: #666;
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
</style>
