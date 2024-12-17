<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <h1>Dark Kitchen</h1>
      </div>
      <div class="right-section">
        <span v-if="isAuthenticated" class="welcome-message">Bonjour, {{ user.name }}</span>
        <button v-if="!isAuthenticated" class="login-btn" @click="toggleLoginModal">Login</button>
        <button v-else class="logout-btn" @click="logout">Logout</button>
        <div class="menu-icon" @click="toggleDropdown">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span v-if="!isDropdownOpen && cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </div>
      </div>
      <ul v-if="isDropdownOpen" class="dropdown">
        <li><router-link to="/" @click="closeDropdown">Home</router-link></li>
        <li><router-link to="/menu" @click="closeDropdown">Menu</router-link></li>
        <li>
          <router-link to="/cart" @click="closeDropdown">Cart</router-link>
          <span v-if="cartCount > 0" class="dropdown-cart-count">{{ cartCount }}</span>
        </li>
      </ul>
    </nav>

    <LoginModal
      v-if="isLoginModalOpen"
      @close="closeLoginModal"
      @openSignup="openSignupModal"
      @login="handleLogin"
    />

    <SignupModal
      v-if="isSignupModalOpen"
      @close="closeSignupModal"
      @openLogin="openLoginModal"
      @signup="handleSignup"
    />
  </header>
</template>

<script>
import LoginModal from './LoginModal.vue'
import SignupModal from './SignupModal.vue'
import api from '../services/api'

export default {
  name: "AppHeader",
  components: {
    LoginModal,
    SignupModal
  },
  props: {
    cartItems: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
      user: null, // Stocke les informations de l'utilisateur
    };
  },
  computed: {
    cartCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
    isAuthenticated() {
      return !!this.user;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    toggleLoginModal() {
      this.isLoginModalOpen = !this.isLoginModalOpen;
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    openSignupModal() {
      this.isLoginModalOpen = false;
      this.isSignupModalOpen = true;
    },
    closeSignupModal() {
      this.isSignupModalOpen = false;
    },
    openLoginModal() {
      this.isSignupModalOpen = false;
      this.isLoginModalOpen = true;
    },
    async handleLogin({ email, password }) {
      try {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        // Stocker le token dans localStorage
        localStorage.setItem('token', token);
        // Mettre à jour l'état utilisateur
        this.user = user;
        alert(`Connecté avec ${email}`);
        this.closeLoginModal();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Erreur lors de la connexion');
      }
    },
    async handleSignup({ nom, email, password, confirmPassword }) {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
      try {
        const name = `${nom}`; // Construire le nom complet
        const response = await api.post('/auth/register', { name, email, password });
        const { token, user } = response.data;
        // Stocker le token dans localStorage
        localStorage.setItem('token', token);
        // Mettre à jour l'état utilisateur
        this.user = user;
        alert(`Inscription réussie avec ${email}`);
        this.closeSignupModal();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Erreur lors de l\'inscription');
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
      alert('Déconnecté avec succès');
    },
    async fetchUserProfile() {
      try {
        const response = await api.get('/auth/profile');
        this.user = response.data;
      } catch (error) {
        console.error(error);
        // Token invalide ou expiré, déconnecter l'utilisateur
        this.logout();
      }
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUserProfile();
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
  position: relative;
}

.logo h1 {
  color: #fff;
  font-size: 1.5rem;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome-message {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}

.login-btn, .logout-btn {
  background-color: #b98342;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.login-btn:hover, .logout-btn:hover {
  background-color: #ff7f00;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  position: relative;
}

.menu-icon .bar {
  width: 25px;
  height: 3px;
  background-color: #fff;
  border-radius: 2px;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  right: -15px;
}

.dropdown {
  position: absolute;
  top: 60px;
  right: -15px;
  background-color: rgba(51, 51, 51, 0.95);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 15px 20px;
  animation: dropdownFadeIn 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.dropdown a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s ease;
}

.dropdown a:hover {
  color: #ffa500;
}

.dropdown-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 0.8rem;
  margin-left: 10px;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>