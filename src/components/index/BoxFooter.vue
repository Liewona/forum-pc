<template>
  <div class="authorMsg">
    <span>
      <i class="el-icon-user-solid"></i>
      <a href="#" :uid="data.uid" onclick="return false" v-text="data.uname"></a>
    </span>
    <span style="margin-left: 20px;">
      <i class="el-icon-time"></i>
      {{data.createTime}}
    </span>
    <span style="float: right;">
      <i class="el-icon-view"></i>
      {{data.clickCount}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
};
</script>

<style>
</style>