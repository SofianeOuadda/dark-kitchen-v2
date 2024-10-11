<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <h1>Dark Kitchen</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/menu">Menu</router-link></li>
        <li>
          <router-link to="/cart">Cart</router-link>
          <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    cartItems: Array
  },
  computed: {
    cartCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #333;
  padding: 15px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: #fff;
  font-size: 1.5rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.nav-links a:hover {
  color: #ffa500;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 0.8rem;
  margin-left: 10px;
}
</style>