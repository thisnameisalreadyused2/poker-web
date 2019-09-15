<template>
  <div id="poker">
    <Logo></Logo>

    <a-tabs defaultActiveKey="2" :size="'large'" class="tab__box">
      <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="edit" />Story
          </span>

        <div class="story__box">
          <div class="story__text">
            <a-textarea v-model="userStory" placeholder="Enter user story" :rows="4"/>
            <a-button class="poker__btn">
              Start
              <a-icon type="caret-right"/>
            </a-button>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="appstore"/>Cards
        </span>

        <UserStory v-bind:userStory="userStory"></UserStory>

        <CardList></CardList>

      </a-tab-pane>

      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="profile"/>Result
        </span>

        <UserStory v-bind:userStory="userStory"></UserStory>

        <div class="poker__table">
          <div class="poker__table-box">
            <a-table :columns="columns"
                     :dataSource="data"
                     :pagination="false"
                     bordered
            ></a-table>
          </div>
        </div>

        <pure-vue-chart onchange="this.updateDiagram()" class="poker__diagram"
                        :points="diagramValues"
                        :show-y-axis="false"
                        :show-x-axis="true"
                        :width="300"
                        :height="100"
                        :show-values="true"
        />
        <a-button class="poker__btn" @click="startNewVote">Start new</a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import Logo from "../components/Logo";
  import CardList from "../components/cards/CardList";
  import PureVueChart from 'pure-vue-chart';
  import UserStory from "../components/UserStory";

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
    CardList,
    UserStory,
    PureVueChart,
  },
  data() {
    return {
      data,
      columns,
      diagramValues:
        [{label: '1', value: 4},
          {label: '2', value: 7},
          {label: '3', value: 5},
          {label: '5', value: 4},
          {label: '8', value: 6},
          {label: '13', value: 10},
          {label: '21', value: 4},
          {label: '34', value: 7},
          {label: '55', value: 2}],
      token: this.$route.params.id,
      userStory: null,
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
    updateDiagram() {
      this.diagramValues = [{label: '1', value: 4},
        {label: '2', value: 7},
        {label: '3', value: 5},
        {label: '5', value: 4},
        {label: '8', value: 6},
        {label: '13', value: 10},
        {label: '21', value: 4},
        {label: '34', value: 7},
        {label: '55', value: 2}]
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

  .poker__diagram{
    margin-top: 4rem;
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

    .poker__table{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .poker__table-box{
      min-width: 30rem;
    }

    .poker__diagram{
      zoom: 150%;
    }
  }

  @media only screen and (min-device-width: 1000px){
    .poker__table-box{
      min-width: 40rem;
    }
  }

  @media only screen and (min-device-width: 1500px){
    .poker__table-box{
      min-width: 50rem;
    }
  }
</style>
