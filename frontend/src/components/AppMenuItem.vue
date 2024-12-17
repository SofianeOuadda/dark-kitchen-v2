<template>
  <div class="menu-item">
    <img :src="image" alt="Menu Item" class="menu-item-image" />
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
    <p><strong>{{ formatPrice(price) }}</strong></p>
    <button @click="addToCart">Ajouter au panier</button>
  </div>
</template>

<script>
export default {
  name: 'AppMenuItem',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart');
    },
    formatPrice(price) {
      return `${price} €`;
    }
  }
}
</script>

<style scoped>
.menu-item {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease;
}
.menu-item:hover {
  transform: scale(1.05);
}

.menu-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #ffb347;
}
</style>
