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
            <a-button class="poker__btn" @click="changeUserStory">
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

        <div>
          <pure-vue-chart v-if="diagramValues.length !== 0" class="poker__diagram"
                          :points="diagramValues"
                          :show-y-axis="false"
                          :show-x-axis="true"
                          :width="300"
                          :height="100"
                          :show-values="true"
          />
        </div>

        <a-button class="poker__btn" @click="startNewVote">
          Start new
          <a-icon type="reload"/>
        </a-button>
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
      diagramValues: [],
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
    disconnect: function() {
      this.data = [];
    },
    needRegister() {
      this.$router.push('/registration/' + this.token);
    },
    voteEnded(data) {
      this.data = data;
      this.countDiagramData(this.data);
    },
    restartVoting() {
      this.data = [];
    },
  },
  methods: {
    generateToken() {
      this.$socket.emit("requestToken");
    },
    countDiagramData(arrayNew) {
      let allValues = [];
      let result = [
        {label: '1', value: 0},
        {label: '2', value: 0},
        {label: '3', value: 0},
        {label: '5', value: 0},
        {label: '8', value: 0},
        {label: '13', value: 0},
        {label: '21', value: 0},
        {label: '34', value: 0},
        {label: '55', value: 0},];

      for (let d in arrayNew) {
        allValues.push(arrayNew[d].points);
      }
      console.log(allValues);

      for (let i = 0; i < allValues.length; i++) {
        if (allValues[i] === 1) {
          result[0].value++;
        } else if (allValues[i] === 2) {
          result[1].value++;
        } else if (allValues[i] === 3) {
          result[2].value++;
        } else if (allValues[i] === 5) {
          result[3].value++;
        } else if (allValues[i] === 8) {
          result[4].value++;
        } else if (allValues[i] === 13) {
          result[5].value++;
        } else if (allValues[i] === 21) {
          result[6].value++;
        } else if (allValues[i] === 34) {
          result[7].value++;
        } else {
          result[8].value++;
        }
      }
      console.log(result);
      this.diagramValues = result;
    },
    startNewVote() {
      this.$socket.emit('onRestartVoting', {
        token: this.token
      });
      this.diagramValues = [];
    },
    addOrReplace(item) {
      const i = this.data.findIndex(_item => _item.id === item.id);
      if (i > -1) {
        this.data = this.data.filter(user => user.id !== item.id);
      } else this.data.push(item);
    },
    changeUserStory() {
      this.$socket.emit('changeUserStory', {
        userStory: this.userStory,
        token: this.token,
      });
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
