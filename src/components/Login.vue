<template>
  <div>
    <p>Accede con tu correo y contraseña</p>
    <input type="text" v-model="User" />
    <input type="number" v-model="Pass" />
    <button type="text" @click="Loguin">Ingresar</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      User: "",
      Pass: "",
    };
  },
  methods: {
    Loguin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.User, this.Pass)
        .then((user) => this.$router.replace("home"))
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },
  },
};
</script>
