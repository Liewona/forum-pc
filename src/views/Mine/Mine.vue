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
      <!-- <el-main id="mineIndex"> -->
        <router-view></router-view>
      <!-- </el-main> -->
    </el-container>
  </div>
</template>

<script>
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
</style>