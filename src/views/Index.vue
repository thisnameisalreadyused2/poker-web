<template>
  <div class="index">

    <div class="index__logo">
      Planning P<a-icon type="fire" theme="twoTone" twoToneColor="#cc0000" />ker
    </div>

    <a-button class="index__btn" @click="generateToken">
      Generate
      <a-icon type="qrcode"></a-icon>
    </a-button>

    <p class="index__link" v-if="isTokenGenerated">Ссылка скопирована в буфер обмена (нет)</p>

    <div class="index__qr">
      QR
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isTokenGenerated: false
      }
    },
    sockets: {
      connect: function () {
        console.log("Socket connected");
      },
      receiveToken(data) {
        this.isTokenGenerated = true;
        console.log("Your team token: ", data.token);
      }
    },
    methods: {
      generateToken() {
        this.$socket.emit('requestToken');
      }
    }
  };
</script>

<style lang="scss">
  .index{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .index__logo{
    margin: 1rem;
    zoom: 200%;
    font-weight: bold;
    //color: #cc0000;
  }

  .index__btn{
    margin: 1rem;
  }

  .index__link{
    margin: 1rem;
  }

  .index__qr{
    width: 10rem;
    height: 10rem;
    background-color: #42b983;
  }
  @media only screen and (min-device-width: 400px){
    .index__logo{
      font-size: 1rem;
    }

    .index__btn{
      zoom: 150%;
    }

    .index__link{
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
</style>
