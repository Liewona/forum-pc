<template>
  <div id="app">
    <div id="nav">
      <forum-title></forum-title>
    </div>
    <router-view />
  </div>
</template>


<script>
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  var strs = str.split("&");
  for (var i = 0; i < strs.length; i++) {
    theRequest[strs[i].split("=")[0]] = decodeURIComponent(
      strs[i].split("=")[1]
    );
  }
}
var uid = theRequest.uid;

import ForumTitle from "@/components/index/ForumTitle.vue";
export default {
  components: {
    ForumTitle
  },
  beforeCreate() {
    this.$axios
      .post("api/logmsg")
      .then(res => {
        if (res.data.code == "0000") {
          console.log(res.data.data)
          //sessionStorage.setItem("userInfo", res.data);
          this.$store.state.userInfo = res.data.data;
          this.$store.state.hasLogin = true;
          console.log(this.$store.state.userInfo.uid);
          
        }
      })
      .catch(err => {});
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息

    console.log(uid);
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    // this.login();
  },
  watch: {
    // 旧版本使用 '$route'(tom from)进行监听
    $route(to, from) {
      //
      console.log(to);
      console.log(from);
      this.data = to.params.id;
    }
  },
  methods: {
    // login() {
    //   this.$axios
    //     .get("/api/user/userInfo", {
    //       params: {
    //         userId: uid
    //       }
    //     })
    //     .then(res => {
    //       if (res.data.code == 0) {
    //         //this.$message.success(res.data.msg);
    //         // this.$router.replace({path: '/index'})
    //         //this.dialogFormVisible = false;
    //        // this.$store.commit("login",successResponse.data.obj);
    //        this.$store.state.hasLogin = true;
    //         this.$store.state.userInfo = res.data.data;
    //       } else {
    //         this.$message.error(res.data.msg);
    //       }
    //     })
    //     .catch(err => {
    //      // this.$message.error("登录失败");
    //       console.log("error submit!!");
    //     });
    // }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;
  padding: 0;
  font-weight: bold;
}

.body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
