<template>
  <div id="index">
    <Logo></Logo>

    <a-button class="index__btn" @click="generateToken">
      Generate
      <a-icon type="link" />
    </a-button>

    <a-tag class="index__alert" color="orange" v-if="isTokenGenerated">
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
  },
  data() {
    return {
      isTokenGenerated: false
    };
  },
  sockets: {
    connect: function() {
      console.log("Socket connected");
    },
    receiveToken(data) {
      this.isTokenGenerated = true;
      console.log("Your team token: ", data.token);
    }
  },
  methods: {
    generateToken() {
      this.$socket.emit("requestToken");
    }
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
