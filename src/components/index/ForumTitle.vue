<template>
  <el-container style="background:#fff; border-bottom:5px solid rgb(121, 187, 255);">
    <div style="width: 1000px; margin: 0 auto; height:60px; padding:10px;">
      <div style="line-height: 60px; font-size:35px;display: inline-block; cursor: pointer;"
        @click="toIndex">
        X 论 坛
      </div>
      <div style="float: right; display: inline-block;">
        <!-- <el-avatar :size="60"> user </el-avatar> -->
        <el-button v-if="!hasLogin"
          style="line-height: 60px; padding:0;"
          type="text"
          @click="login">登录/注册</el-button>
        <el-tooltip v-else
          placement="bottom"
          style="padding: 0;">
          <div slot="content">
            <el-button type="text"
              @click="exit">退出</el-button>
          </div>
          <el-button type="text"
            @click="toPersonal">
            <el-avatar :size="60"
              :src="img"></el-avatar>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      img: "",
    };
  },
  created() {
    if(this.$store.state.userInfo) {

    } else  {
      this.$axios
      .post("api/logmsg")
      .then(res => {
          console.log(res.data.data)
          console.log(res.data)
        if (res.data.code == "0000") {
          //sessionStorage.setItem("userInfo", res.data);
          this.img = res.data.data.img;          
        }
      })
      .catch(err => {});
      return ;
    }
    this.img = this.$store.state.userInfo.img;
    if(this.img) {
      console.log(this.img)
      return true;
    }
    
    // alert(this.img)
  },
  computed: {
    hasLogin() {
      return this.$store.state.hasLogin;
    }
  },
  methods: {
    toPersonal() {
      this.$router.push({
        path: "/mineIndex",
        query: { id: this.$store.state.userInfo.uid }
      });
      // this.$router.push({ path: '/good', query: { goodId:goodId }});

      // this.$store.state.goodId = goodId;
    },
    exit() {
      this.$store.state.hasLogin = false;
      this.$store.state.userInfo = null;
      this.$router.push("/");
      this.$axios.post("/api/logout")
      .then(res => {
        this.$message.success("退出成功");
      })
      .catch(err => {
        console.log(err);
      })
    },
    toIndex() {
      this.$router.push({ path: "/" });
    },
    login() {
      window.location.href = "/loginUser.html";
    }
  }
};
</script>

<style>
</style>