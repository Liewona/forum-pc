<template>
  <div id="app">
    <div id="nav">      
      <forum-title></forum-title>
    </div>
    <router-view />
  </div>
</template>


<script>

import ForumTitle from "@/components/index/ForumTitle.vue";
export default {  
  components: {
    ForumTitle
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
  login()
  {
    this.$axios
            .get("/user/UserInfo", {
              userId: 1
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg);
                // this.$router.replace({path: '/index'})
                this.dialogFormVisible = false;
                this.$store.state.hasLogin = true;
                this.$store.state.userInfo = res.data.obj;
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$message.error("登录失败");
              console.log("error submit!!");
            });
  }
}
}

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
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
</style>
