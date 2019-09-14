<template>
  <div id="index">
    <Logo></Logo>

    <a-button class="index__btn"
      >Generate
      <a-icon type="qrcode"></a-icon>
    </a-button>

    <a-tag class="index__alert" color="orange">
      Link copied to clipboard
    </a-tag>

    <div class="index__qr">QR</div>
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

  .index__btn {
    margin: 1rem;
  }

  .index__link {
    margin: 1rem;
  }

  .index__qr {
    width: 10rem;
    height: 10rem;
    background-color: #42b983;
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
