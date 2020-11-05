<template>
  <el-container style="background:#fff; border-bottom:5px solid rgb(121, 187, 255);">
    <div style="width: 1000px; margin: 0 auto; height:60px; padding:10px;">
      <div style="line-height: 60px; font-size:35px;display: inline-block;">
        X 论 坛
      </div>
      <div style="float: right; display: inline-block;">
        <!-- <el-avatar :size="60"> user </el-avatar> -->
        <el-button
              v-if="!hasLogin"
              type="text"
              >登录/注册</el-button
            >
            <el-tooltip v-else placement="bottom">
              <div slot="content">
                <el-button type="text" @click="exit">退出</el-button>
              </div>
              <el-button type="text" @click="toPersonal">
                <el-avatar :size="50" :src="this.$store.state.userInfo.userimg"></el-avatar>
              </el-button>
            </el-tooltip>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  computed: {
    hasLogin() {
      return this.$store.state.hasLogin;
    },
  },
  methods:{
    toPersonal(){
      this.$router.push('/mineIndex');
    },
    exit() {
      this.$store.state.hasLogin = false;
      this.$store.state.userInfo = null;
      this.$router.push("/");
    },
  }
};
</script>

<style>
</style>