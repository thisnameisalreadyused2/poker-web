<template>
  <div>
    <div class="card__list">
      <Card v-for="number in numbers"
            v-bind:number="number"
            v-bind:class="{ selected: isSelected(number) }"
            @click.native="() => selectCard(number)">
      </Card>
    </div>
  </div>

</template>

<script>
  import Card from "./Card";

  export default {
    name: "CardList",
    components: {
      Card
    },
    data() {
      return {
        numbers: [1, 2, 3, 5, 8, 13, 21, 34, 55],
        selectedNumber: null,
        token: this.$route.params.id,
      };
    },
    sockets: {
      restartVoting() {
        this.selectedNumber = null;
      },
    },
    methods: {
      selectCard(number) {
        this.selectedNumber = number;
        this.$socket.emit('newVote', {
          token: this.token,
          user: sessionStorage.getItem("username"),
          vote: this.selectedNumber,
        })
      },
      isSelected(number) {
        return this.selectedNumber === number;
      },
    }
  };
</script>

<style lang="scss">
  .card__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-device-width: 1020px) {
    .card__list {
      margin: 0 2rem;
    }
  }

  @media only screen and (min-device-width: 1430px) {
    .card__list {
      margin: 0 15rem;
    }
  }

  @media only screen and (min-device-width: 2560px) {
    .card__list {
      margin: 0 50rem;
    }
  }
</style>
