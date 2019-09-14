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

        <div class="table__box">
          <a-table class="poker__table"
                   :columns="columns"
                   :dataSource="data"
                   :pagination="false"
                   bordered
          ></a-table>
        </div>

      </a-tab-pane>
    </a-tabs>

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

  const data = [{
    key: '1',
    name: 'John Brown',
    points: 32,
  }, {
    key: '2',
    name: 'Jim Green',
    points: 42,
  }];

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
    }
  },
  methods: {
    generateToken() {
      this.$socket.emit("requestToken");
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

  .table__box {
    display: flex;
    justify-content: center;
  }

  .poker__table {
    min-width: 30rem;
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
