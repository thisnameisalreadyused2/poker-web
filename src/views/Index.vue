<template>
  <div id="index">
    <Logo></Logo>

    <a-button class="index__btn" @click="generateToken">
      Generate
      <a-icon type="link" />
    </a-button>

    <Animated enter="fadeIn" leave="fadeOut" duration="1000">
      <a-input class="index__token" v-if="token" addonBefore="Team token:" :value="token">
        <a-icon class="index__copy" slot="suffix" type="copy" @click="copyToClipboard"/>
      </a-input>
    </Animated>

    <input type="hidden" id="generated-token" :value="token">

  </div>
</template>

<script>
import Logo from "../components/Logo";
import copy from 'copy-to-clipboard';

export default {
  name: "index",
  components: {
    Logo
  },
  data() {
    return {
      token: null,
    };
  },
  sockets: {
    connect: function() {
      console.log("Socket connected");
    },
    receiveToken(data) {
      this.token = data.token;
      console.log("Your team token: ", this.token);
    }
  },
  methods: {
    generateToken() {
      this.$socket.emit("requestToken");
    },
    copyToClipboard() {
      try {
        copy(document.location.href + "poker/" + this.token);
        this.success();
      } catch (err) {
        this.error();
      }
    },
    success() {
      this.$message.success('Link was copied to clipboard');
    },
    error() {
      this.$message.error('Link wasn`t copied to clipboard');
    },
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

  .index__copy:hover {
    cursor: pointer;
    color: #1890ff;
  }

  .index__token {
    width: 80%;
    max-width: 50rem;
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
