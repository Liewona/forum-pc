<template>
  <div class="authorMsg">
    <span>
      <i class="el-icon-user-solid"></i>
      <span class="name-tag" :uid="data.uid" @click="clickUser" v-text="data.uname"></span>
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
  methods: {
    clickUser() {
      this.$router.push({
        name: "UserSpace",
        params: {
          id: this.data.uid
        }
      })
    }
  }
};
</script>

<style>
.name-tag {
  cursor: pointer;
}
.name-tag:hover {
  text-decoration: underline;
}
</style>