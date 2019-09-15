<template>
  <div id="poker">
    <Logo></Logo>

    <a-tabs defaultActiveKey="1" class="tab__box">
      <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="edit" />Story
          </span>
        <div class="story__box">
          <div class="story__text">
            <a-textarea placeholder="Enter user story" :rows="4"/>
            <a-button class="poker__btn"
            >Start
              <a-icon type="caret-right" />
            </a-button>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="appstore"/>Cards
        </span>

        <CardList></CardList>

      </a-tab-pane>

      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="profile"/>Result
        </span>

        <a-table :columns="columns"
                 :dataSource="data"
                 :pagination="false"
                 bordered

        ></a-table>

      </a-tab-pane>
    </a-tabs>
    <button @click="startNewVote">Start new</button>
  </div>
</template>

<script>
  import Logo from "../components/Logo";
  import CardList from "../components/cards/CardList";

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Points',
    dataIndex: 'points',
    key: 'points',
  }];

  const data = [];

export default {
  name: "Poker",
  components: {
    Logo,
    CardList
  },
  data() {
    return {
      data,
      columns,
      token: this.$route.params.id,
    };
  },
  sockets: {
    connect: function() {
      this.$socket.emit("newTeamMember", {
        token: this.token,
        username: sessionStorage.getItem("username")
      })
    },
    needRegister() {
      this.$router.push('/registration/' + this.token);
    },
    voteEnded(data) {
      this.data = data;
    },
    restartVoting() {
      this.data = [];
    },
  },
  methods: {
    generateToken() {
      this.$socket.emit("requestToken");
    },
    startNewVote() {
      this.$socket.emit('onRestartVoting', {
        token: this.token
      });
    },
    addOrReplace(item) {
      const i = this.data.findIndex(_item => _item.id === item.id);
      if (i > -1) {
        this.data = this.data.filter(user => user.id !== item.id);
      } else this.data.push(item);
    }
  },
};
</script>

<style lang="scss">
  .story__box{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .story__text{
    max-width: 15rem;
  }

  .poker__btn{
    margin-top: 1rem;
  }

  @media only screen and (min-device-width: 360px){
    .story__text{
      min-width: 20rem;
    }
  }

  @media only screen and (min-device-width: 700px){
    .story__text{
      min-width: 40rem;
    }
  }
</style>
