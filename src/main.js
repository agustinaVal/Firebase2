import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCXWyEEL73iEflxAXj0vRcHM8wyoEM8Rqk",
  authDomain: "desafio-autentificacion.firebaseapp.com",
  databaseURL: "https://desafio-autentificacion.firebaseio.com",
  projectId: "desafio-autentificacion",
  storageBucket: "desafio-autentificacion.appspot.com",
  messagingSenderId: "966140501801",
  appId: "1:966140501801:web:c35a2d46a8768df6286138"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
