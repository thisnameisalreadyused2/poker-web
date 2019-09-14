<template>
  <div id="index">
    <Logo></Logo>

    <a-input class="reg__input" placeholder="Team name">
      <a-icon slot="prefix" type="user" />
    </a-input>

    <a-button class="index__btn"
      >Generate
      <a-icon type="link" />
    </a-button>

    <a-tag class="index__alert" color="orange">
      Link copied to clipboard
    </a-tag>
  </div>
</template>

<script>
import Logo from "../components/Logo";

export default {
  name: "index",
  components: {
    Logo
  }
};
</script>

<style lang="scss">
#index {
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

  .index__btn {
    margin: 1rem;
  }

  .index__link {
    margin: 1rem;
  }

  .index__alert {
    margin-bottom: 1rem;
  }

  @media only screen and (min-device-width: 400px) {
    .index__logo {
      font-size: 1rem;
    }

    .index__btn {
      zoom: 150%;
    }
  }
}
</style>
