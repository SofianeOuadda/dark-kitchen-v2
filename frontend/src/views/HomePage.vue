<template>
  <div class="home-content">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to S&T Goreng</h1>
        <p>Experience the flavors of Indonesia with Sofiane & Thomas! <br> Delicious and freshly made Nasi and Mie Goreng, straight from the streets of Asia to your doorstep! <br><br>ORDER NOW!</p>
        <router-link to="/menu" class="btn-primary">View to menus</router-link>
      </div>
    </section>

    <section class="featured-dish">
      <div class="container">
        <h2>Daily Special</h2>
        <div class="dish">
          <img src="@/assets/images/Nasi-Goreng-receta.jpg" alt="Plat du jour">
          <div class="dish-details">
            <h3>Egg Nasi Goreng</h3>
            <p>Delicious Vegetable Fried Rice with Fried Egg.</p>
            <button @click="addToCart" class="btn-secondary">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    cartItems: Array 
  },
  methods: {
    addToCart() {
      const item = {
        name: 'Egg Nasi Goreng',
        description: 'Delicious Vegetable Fried Rice with Fried Egg.',
        price: 9,
        image: require('@/assets/images/Nasi-Goreng-receta.jpg')
      };
     
      this.$emit('add-to-cart', item);

      
      this.$router.push('/cart');
    }
  }
}
</script>

<style scoped>

.hero {
  background-image: url('@/assets/images/th.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-content {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background-color: #b98342;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #ffcc00;
}

.featured-dish {
  padding: 2rem 0;
  text-align: center;
  background-color: #f9f9f9;
}

.featured-dish .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dish {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dish img {
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.dish-details h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.dish-details p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.btn-secondary {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #ffa500;
}
</style>