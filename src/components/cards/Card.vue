<template>
  <Animated enter="fadeIn" leave="fadeOut" duration="2000" mode="out-in" appear>
    <div class="card__box">{{ number }}</div>
  </Animated>
</template>

<script>
  export default {
    name: "Card",
    props: ["number"]
  };
</script>

<style lang="scss">
  .card__box {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 7px;
    font-size: 2.5rem;
    width: 4.8rem;
    height: 7rem;
    margin: 0.6rem;
    border-radius: 0.5rem;
  }

  .selected,
  .card__box:hover {
    box-shadow: 1px 1px 20px #1890ff;
    color: #1890ff;
  }

  @media only screen and (min-device-width: 400px) {
    .card__box {
      margin: 0.8rem;
      width: 6.5rem;
      height: 10rem;
      font-size: 3rem;
    }
  }

  @media only screen and (min-device-width: 768px) {
    .card__box {
      margin: 1.5rem;
      width: 9.5rem;
      height: 13rem;
      font-size: 4rem;
      box-shadow: 1px 1px 10px;
    }
  }

  @media only screen and (min-device-width: 1020px) {
    .card__box {
      margin: 1.5rem;
      width: 13rem;
      height: 20rem;
      font-size: 7rem;
      border-radius: 1rem;
    }
  }

  @media only screen and (min-device-width: 1430px) {
    .card__box {
      margin: 1.5rem;
      width: 13rem;
      height: 20rem;
      font-size: 7rem;
    }
  }

  @media only screen and (min-device-width: 2560px) {
    .card__box {
      margin: 2rem;
    }
  }
</style>
