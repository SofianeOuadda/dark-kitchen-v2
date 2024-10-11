<template>
  <div class="cart-page">
    <div class="cart-list">
      <AppCartItem 
        v-for="(item, index) in cartItems" 
        :key="index" 
        :name="item.name" 
        :price="item.price" 
        :quantity="item.quantity"
        @remove-from-cart="removeFromCart(item)" 
        @update-quantity="updateQuantity(item, $event)" 
      />
    </div>

    <div class="cart-summary">
      <hr class="separator" />
      <div class="total-section">
        <h3>Total: {{ calculateTotal() }} €</h3>
      </div>
      <button class="btn-primary" @click="placeOrder">Commander</button>
    </div>
  </div>
</template>

<script>
import AppCartItem from '@/components/AppCartItem.vue'

export default {
  name: 'CartPage',
  components: {
    AppCartItem
  },
  props: {
    cartItems: Array,
    removeFromCart: Function
  },
  methods: {
    updateQuantity(item, change) {
      const cartItem = this.cartItems.find(cartItem => cartItem.name === item.name);
      if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
          this.removeFromCart(cartItem);
        }
      }
    },
    calculateTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    placeOrder() {
      console.log('Commande passée');
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.cart-list {
  width: 100%;
  max-width: 800px;
}

.cart-summary {
  width: 100%;
  max-width: 800px;
  margin-top: -2rem;
}

.separator {
  border: none;
  border-top: 2px solid #b98342;
  margin: 1rem 0;
}

.total-section {
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 1rem;
}

.total-section h3 {
  font-size: 1.5rem;
  margin: 0;
}

.btn-primary {
  background-color: #b98342;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #ffcc00;
}
</style>
