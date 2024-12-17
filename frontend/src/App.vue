<template>
  <div id="app">
    <AppHeader 
      :cartItems="cart" 
      @add-to-cart="addToCart" 
      @remove-from-cart="removeFromCart" 
    />

    <main class="main-content">
      <router-view 
        :cartItems="cart" 
        @add-to-cart="addToCart" 
        @remove-from-cart="removeFromCart" 
      />
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      cart: []
    };
  },
  created() {
    // Charger le panier depuis localStorage au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch (error) {
        console.error('Erreur lors de la récupération du panier depuis localStorage:', error);
        this.cart = [];
      }
    }
  },
  watch: {
    cart: {
      handler(newCart) {
        // Mettre à jour localStorage chaque fois que le panier change
        localStorage.setItem('cart', JSON.stringify(newCart));
      },
      deep: true // Pour surveiller les changements dans les objets du tableau
    }
  },
  methods: {
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
      // localStorage sera mis à jour automatiquement via le watcher
    },

    removeFromCart(item) {
      this.cart = this.cart.filter(cartItem => cartItem._id !== item._id);
      // localStorage sera mis à jour automatiquement via le watcher
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#app footer {
  margin-top: auto;
}
</style>
