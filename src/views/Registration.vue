<template>
  <div id="registration">
    <Logo></Logo>

    <a-input class="reg__input" placeholder="Your name" v-model="username">
      <a-icon slot="prefix" type="user"/>
    </a-input>

    <a-button class="reg__btn" @click="saveUserName"> <a-icon type="team"/>Join team </a-button>
  </div>
</template>

<script>
import Logo from "../components/Logo";

export default {
  name: "Registration",
  components: {
    Logo
  },
  data () {
    return {
      token: this.$route.params.id,
      username: "",
    }
  },
  methods: {
    saveUserName() {
      console.log(this.username);
      sessionStorage.setItem("username", this.username);
      this.$router.push('/poker/' + this.token);
      this.$socket.emit("newTeamMember", {
        token: this.token,
        username: sessionStorage.getItem("username")
      })
    }
  }
};
</script>

<style lang="scss">
#registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  zoom: 125%;

  .reg__input {
    width: 80%;
    max-width: 40rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
