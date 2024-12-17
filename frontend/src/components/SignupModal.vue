<template>
    <div class="modal-overlay" @click="close">
      <div class="modal-content signup-modal" @click.stop>
        <h2 class="modal-title">Inscription</h2>
        <p class="modal-subtitle">Rejoignez la famille S&T Kitchen</p>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="signup-nom">Nom</label>
            <input type="text" id="signup-nom" v-model="nom" required />
          </div>
          <div class="form-group">
            <label for="signup-prenom">Prénom</label>
            <input type="text" id="signup-prenom" v-model="prenom" required />
          </div>
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input type="email" id="signup-email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="signup-password">Mot de passe</label>
            <input type="password" id="signup-password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="signup-confirm-password">Confirmez le mot de passe</label>
            <input type="password" id="signup-confirm-password" v-model="confirmPassword" required />
          </div>
          <button type="submit" class="submit-btn">S'inscrire</button>
        </form>
        <div class="signin-prompt">
          <span>Déjà inscrit ?</span>
          <a href="#" @click.prevent="openLogin">Connectez-vous</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupModal',
    data() {
      return {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      openLogin() {
        this.$emit('openLogin');
      },
      handleSubmit() {
        this.$emit('signup', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles similaires au LoginModal */
  .modal-overlay {
    position: fixed;
    top:0; left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:2000;
  }
  .modal-content {
    background:#fff;
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
  .signin-prompt {
    margin-top:20px;
    text-align:center;
    font-size:0.9rem;
  }
  .signin-prompt a {
    color:#b98342;
    font-weight:bold;
    text-decoration:none;
    margin-left:5px;
  }
  .signin-prompt a:hover {
    color:#ff7f00;
  }
  </style>  