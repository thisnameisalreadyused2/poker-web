<template>
  <div class="user__story-box">
    <div class="user__story">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserStory"
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