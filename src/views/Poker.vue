<template>
  <a-tabs defaultActiveKey="2" class="tab__box">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="appstore" />
        Cards
      </span>
      <div class="card__list">
        <div class="card__box">1</div>
        <div class="card__box">2</div>
        <div class="card__box">3</div>
        <div class="card__box">5</div>
        <div class="card__box">8</div>
        <div class="card__box">13</div>
        <div class="card__box">21</div>
        <div class="card__box">34</div>
        <div class="card__box">55</div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="profile" />
        Result
      </span>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        bordered
      >
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{ text }}</a>
        </template>
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18
  }
];
export default {
  name: "Poker",
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5
            }
          };
        }
      },
      {
        title: "Story points",
        dataIndex: "age",
        customRender: renderContent
      }
    ];
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
.card__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
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
  .card__list {
    margin: 0 2rem;
  }
  .card__box {
    margin: 1.5rem;
    width: 13rem;
    height: 20rem;
    font-size: 7rem;
    border-radius: 1rem;
  }
}
@media only screen and (min-device-width: 1430px) {
  .card__list {
    margin: 0 15rem;
  }
  .card__box {
    margin: 1.5rem;
    width: 13rem;
    height: 20rem;
    font-size: 7rem;
  }
}
@media only screen and (min-device-width: 2560px) {
  .card__list {
    margin: 0 50rem;
  }
  .card__box {
    margin: 2rem;
  }
}
</style>
