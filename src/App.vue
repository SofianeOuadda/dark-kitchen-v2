<template>
  <div id="app">
    <AppHeader :cartItems="cart" />

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
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

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
  methods: {
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.name === item.name && cartItem.price === item.price);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart(item) {
      this.cart = this.cart.filter(cartItem => cartItem.name !== item.name || cartItem.price !== item.price);
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
