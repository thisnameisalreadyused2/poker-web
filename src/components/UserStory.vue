<template>
  <div class="user__story-box">
    <div v-if="userStory" class="user__story">
      <div>User story: {{ userStory }}</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "UserStory",
      props: ["userStory"],
      data() {
        return {
          userStory: null,
        }
      },
      sockets: {
        onChangeUserStory(data) {
          this.userStory = data.userStory;
        }
      }
    }
</script>

<style lang="scss">
  .user__story-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user__story{
    margin-bottom: 2rem;
    max-width: 17rem;
  }

  @media only screen and (min-device-width: 400px){
    .user__story{
      max-width: 27rem;
    }
  }

  @media only screen and (min-device-width: 1000px){
    .user__story{
      max-width: 34rem;
    }
  }
</style>
