<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content login-modal" @click.stop>
      <h2 class="modal-title">Connexion</h2>
      <p class="modal-subtitle">Connectez-vous à votre Dark Kitchen</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="submit-btn" :disabled="loading">
          <span v-if="loading">Connexion...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
      <div class="signup-prompt">
        <span>Pas encore client ?</span>
        <a href="#" @click.prevent="openSignup">Inscrivez-vous</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    openSignup() {
      this.$emit('openSignup');
    },
    async handleSubmit() {
      this.loading = true;
      this.$emit('login', { email: this.email, password: this.password });
      this.loading = false;
    }
  }
}
</script>

<style scoped>
/* Styles existants */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:2000;
}

.modal-content {
  background-color: #fff;
  padding:30px 25px;
  border-radius:10px;
  width:400px;
  max-width:90%;
  box-shadow:0 4px 10px rgba(0,0,0,0.25);
  position:relative;
}

.modal-title {
  font-size:1.8rem;
  margin-bottom:10px;
  text-align:center;
  color:#333;
  font-weight:bold;
}

.modal-subtitle {
  font-size:1rem;
  margin-bottom:20px;
  text-align:center;
  color:#555;
}

.form-group {
  margin-bottom:20px;
}
.form-group label {
  display:block;
  margin-bottom:8px;
  font-weight:bold;
  color:#333;
}
.form-group input {
  width:90%;
  padding:12px 19px;
  border:1px solid #ccc;
  border-radius:5px;
  font-size:1rem;
}
.submit-btn {
  background-color:#333;
  color:#fff;
  border:none;
  padding:12px 15px;
  border-radius:5px;
  cursor:pointer;
  font-size:1rem;
  font-weight:bold;
  width:100%;
  margin-top:10px;
}

.signup-prompt {
  margin-top:20px;
  text-align:center;
  font-size:0.9rem;
}
.signup-prompt a {
  color:#b98342;
  font-weight:bold;
  text-decoration:none;
  margin-left:5px;
}
.signup-prompt a:hover {
  color:#ff7f00;
}
</style>
