<template>
  <div id="registration">
    <Logo></Logo>

    <a-input class="reg__input" placeholder="Your name">
      <a-icon slot="prefix" type="user" />
    </a-input>

    <a-button class="reg__btn"> <a-icon type="team" />Join team </a-button>
  </div>
</template>

<script>
import Logo from "../components/Logo";

export default {
  name: "Registration",
  components: {
    Logo
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
