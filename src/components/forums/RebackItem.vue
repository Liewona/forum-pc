<template>
  <el-container>
    <div>
      <el-avatar :size="40"
        :src="data.fromImg"
        shape="square"></el-avatar>
    </div>
    <div style="width:100%; margin: 0 8px;">
      <div style="word-break: break-all; height: 40px">
        <span @click="clickUser(data.fromId)"
          class="name-tag reply-tag">{{data.fromName}}</span>
        <span v-if="data.toId > 0"> 回复 </span>
        <span @click="clickUser(data.toId)"
          class="name-tag reply-tag"
          v-if="data.toId > 0">{{data.toName}}</span>
        <span>
          : {{data.content}}
        </span>
      </div>
      <div style="text-align: right; font-size: 12px;">
        <i class="el-icon-time"></i>
        {{data.createTime}}
        <span class="reply-tag" @click="toWrite">回复</span>
      </div>
    </div>
  </el-container>

</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
    };
  },
  methods: {
    clickUser(id) {
      this.$router.push({
        name: "UserSpace",
        params: {
          id: id
        }
      });
    },
    toWrite() {
      if(this.$store.state.userInfo) {
        this.$emit("showWriter", true, {to: this.data.fromId, toName: this.data.fromName})
      } else {
        this.$message.error("请先登陆后回复");
      }
      
    }
  }
};
</script>

<style>
.reply-tag {
  color: #1d53bf;
  cursor: pointer;
  margin-left: 5px;
}
</style>