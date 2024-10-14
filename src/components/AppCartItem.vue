<template>
  <div class="cart-item">
    <h3>{{ name }}</h3>
    <p>Price: {{ price }} €</p>
    <p>Quantity: {{ quantity }}</p>
    <div class="quantity-controls">
      <button @click="decreaseQuantity">-</button>
      <button @click="increaseQuantity">+</button>
    </div>
    <button @click="removeFromCart">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'AppCartItem',
  props: {
    name: String,
    price: Number,
    quantity: Number
  },
  
  methods: {
    removeItemFromCart() {
      this.$emit('remove-from-cart');
    },
    decreaseQuantity() {
      if (this.quantity > 0) {
        this.$emit('update-quantity', -1); 
      } 
    },
    increaseQuantity() {
      this.$emit('update-quantity', 1);
    }
  }
}
</script>

<style scoped>
.cart-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0 5px;
}

button:hover {
  background-color: #ffa500;
}
</style>
