<template>
  <el-container class="mineIndex"
    id="mineIndex"
    direction="vertical">
    <el-header>
      <div class="search">
        <el-input placeholder="请输入搜索内容"
          clearable
          v-model="word"
          class="handle-input">
          <el-button type="primary"
            class="searchBtn"
            @click="search"
            slot="append"
            icon="el-icon-search">搜索帖子</el-button>
        </el-input>
      </div>
    </el-header>
    <el-card class="box-card"
      style="margin-bottom:15px">
      <div class="clearfix">
        <span>
          <el-avatar shape="square"
            :size="100"
            :src="this.infoData.img"></el-avatar>
        </span>
        <div class="userinfo_middle">
          <div class="userinfo_title">
            <span class="userinfo_username ">{{ this.infoData.uname }}</span>
          </div>
          <div class="userinfo_userdata">
            <span class="user_name">用户名:{{ this.infoData.uname
              }}
              <!--<span--><span class="userinfo_split"></span>
              <span>年龄:{{ this.infoData.age }}</span><span class="userinfo_split"></span><span>性别:{{ this.infoData.sex }}</span>
            </span>
          </div>
          <el-tag v-if="id == logId"
            @click.native="toInfo()">修改信息</el-tag>
          <el-tag v-else>关注</el-tag>
        </div>
      </div>
    </el-card>
    <div class="body">
      <div v-for="item in data"
        :key="item.id">
        <main-body-one class="itemBox"
          :data="item"></main-body-one>
      </div>
    </div>

    <div style="margin: 25px 0px">
      <el-pagination @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        background="true"
        layout="total, prev, pager, next"
        :total="totleSize">
      </el-pagination>
    </div>
  </el-container>
</template>

<script>
import MainBodyOne from "@/components/index/MainBodyOne.vue";
export default {
  components: {
    MainBodyOne
  },
  beforeCreate() {
    this.$axios
      .get("/api/user/userInfo", {
        params: {
          userId: this.$route.query.id
        }
      })
      .then(res => {
        if (res.data.code == 0) {
          //this.$message.success(res.data.msg);
          // this.$router.replace({path: '/index'})
          //this.dialogFormVisible = false;
          // this.$store.commit("login",successResponse.data.obj);

          this.infoData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        // this.$message.error("登录失败");
        console.log("error submit!!");
      });
  },
  created() {
    if(this.$store.state.userInfo) {
      this.logId = this.$store.state.userInfo.uid;
    }
    this.id = this.$route.query.id;
    console.log({
      userId: this.id,
      begin: this.currentPage1,
      limit: this.pageSize
    });
    this.$axios
      .get("/api/discuss/discussByUid", {
        params: {
          userId: this.id,
          begin: this.currentPage1,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data.discussDtoList;
          this.totleSize = res.data.count;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      logId: Number,
      infoData: [],
      data: [],
      pageSize: 6,
      currentPage1: 1,
      totleSize: 0,
      id: this.$route.query.id,
      userName: "",
      age: "",
      sex: "",
      squareUrl: ""
    };
  },
  computed: {
    // isMe() {
      // return this.$store.state.userInfo.uid == this.id;
    // }
  },
  methods: {
    beforeCreate() {
    this.$axios
      .get("/api/discuss/discussByUid", {
            params: {
              userId: this.id,
              begin: this.currentPage1,
              limit: this.pageSize,
            },
          })
      .then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data.discussDtoList;
          this.totleSize =res.data.count
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
    toInfo() {
      this.$router.push({
        path: "/mineInfo",
        query: { id: this.id }
      });
    },
    getDiscuss() {
      this.$axios
      .get("/api/discuss/discussByUid", {
        params: {
          userId: this.id,
          begin: this.currentPage1,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data.discussDtoList;
          this.totleSize = res.data.count;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      this.$axios
      .get("/api/user/userInfo", {
        params: {
          userId: this.$route.query.id
        }
      })
      .then(res => {
        if (res.data.code == 0) {
          this.infoData = res.data.data;
          this.id = this.infoData.id;
          this.getDiscuss();
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        // this.$message.error("登录失败");
        console.log("error submit!!");
      });
    }
  }
};
</script>

<style>
#mineIndex {
  width: 1000px;
  margin: 0 auto;
  flex: none;
  padding: 0;
}
.box-card {
  padding: 0 20px;
  width: 1000px;
  box-sizing: border-box;
}
.el-card__header {
  padding: 10px 0;
}
.userinfo_middle {
  float: right;
  padding-right: 600px;
}
.userinfo_title {
  /* float: right; */
  padding: 3px 0;
  /* padding-right: 750px; */
  text-align: left;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  height: 26px;
  line-height: 26px;
  margin-top: 10px;
  overflow: hidden;
}
.userinfo_username {
  float: left;
}
body {
  background-color: #eee;
}
.userinfo_num {
  margin-top: 4px;
  color: #797c80;
  overflow: hidden;
  zoom: 1;
}
.userinfo_userdata,
userinfo_appraise {
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #797c80;
  line-height: 22px;
  padding: 3px 0;
  text-align: left;
}
.userinfo_split {
  border-color: #ccc;
  border-style: solid;
  border-width: 0 0 0 1px;
  display: inline-block;
  height: 10px;
  line-height: 10px;
  margin: 0 10px 2px 9px;
  vertical-align: middle;
}
</style>