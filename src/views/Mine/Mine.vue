<template>
  <div>
    <el-container class="mineIndex" id="mineIndex">
      
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