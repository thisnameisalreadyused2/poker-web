<template>
  <div id="poker">
    <Logo></Logo>

    <a-tabs defaultActiveKey="1" class="tab__box">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="appstore"/>Cards
        </span>

        <CardList></CardList>

      </a-tab-pane>

      <a-tab-pane key="2">
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

<style lang="scss"></style>
