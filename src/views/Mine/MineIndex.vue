<template>
  <div>
    <el-container class="mineIndex" id="mineIndex">
      <el-header
        ><div class="search">
          <el-input
            placeholder="请输入搜索内容"
            clearable
            v-model="word"
            class="handle-input"
          >
            <el-button
              type="primary"
              class="searchBtn"
              @click="search"
              slot="append"
              icon="el-icon-search"
              >搜索帖子</el-button
            >
          </el-input>
        </div></el-header
      >
      <el-main id="mineIndex">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span
              ><el-avatar
                shape="square"
                :size="100"
                :src="squareUrl"
              ></el-avatar
            ></span>
            <div class="userinfo_middle">
              <div class="userinfo_title">
                <span class="userinfo_username ">that_is_why</span>
              </div>
              <div class="userinfo_userdata">
                <span class="user_name"
                  >用户名:that_is_why<!--<span--><span
                    class="userinfo_split"
                  ></span>
                  <span>吧龄:6.3年</span><span class="userinfo_split"></span
                  ><span>发贴:17</span>
                </span>
              </div>
              <el-tag>修改信息</el-tag>
            </div>
          </div>
          <div class="body">
            <div v-for="item in data" :key="item.id">
              <main-body-one class="itemBox" :data="item"></main-body-one>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MainBodyOne from "@/components/index/MainBodyOne.vue";
export default {
  components:{
    MainBodyOne
  },
  beforeCreate() {
    this.$axios
      .get("api/discuss")
      .then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
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
      squareUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604466294333&di=b4981770df21a26896005769cda194c0&imgtype=0&src=http%3A%2F%2Foss.5eplay.com%2Feditor%2F20200301%2F1c8c26566f712493c52307f5217efb22.jpeg"
    };
  }
};
</script>

<style>
#mineIndex {
  /* width: 1000px; */
  margin: 0 auto;
  flex: none;
  padding: 0;
}
.search {
  text-align: center;
}
#mineIndex .searchBtn {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  border-radius: 0;
  padding-right: 30px;
}
.box-card {
  padding: 0 20px;
  width: 1000px;
}
.el-card__header {
  padding: 10px 0;
}
.userinfo_middle {
  float: right;
  padding-right: 640px;
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