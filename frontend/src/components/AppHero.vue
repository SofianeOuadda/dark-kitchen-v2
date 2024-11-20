<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <h1>Dark Kitchen</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/menu">Menu</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background-color: #333;
  padding: 1rem 2rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.8rem;
  color: #fff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.nav-links a:hover {
  color: #ffb347;
}
</style>
