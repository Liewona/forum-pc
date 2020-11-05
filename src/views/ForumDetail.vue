<template>
  <div>
    <div>
      <div class="detail-title">
        {{discuss.title}}
      </div>
      <first-item :data="discuss"></first-item>
    </div>
    <div>
      <div v-for="item in remarks">
        <detail-item :data="item"></detail-item>
      </div>
    </div>

    <div id="detailEditor" class="editor"
      v-if="uid > 0">
      <wang-editor @pressVal="pressVal"
        ref="editor"></wang-editor>
    </div>
  </div>
</template>

<script>
import DetailItem from "@/components/forums/DetailItem.vue";
import FirstItem from "@/components/forums/FirstItem.vue";
import WangEditor from "@/components/WangEditor.vue";
export default {
  components: {
    DetailItem,
    FirstItem,
    WangEditor
  },
  created() {
    console.log(this.$route.params);
    this.did = this.$route.params.id;
    // this.uid = 
    if(this.$store.state.userInfo) {
      this.uid = this.$store.state.userInfo.uid;
    }
    this.getDiscuss();
    this.getData();
  },
  data() {
    return {
      uid: 0,
      did: 1,
      discuss: {},
      remarks: []
    }
  },
  methods: {
    pressVal(html) {
      if(this.uid <= 0) {
        this.$message.error("请先登陆后发帖");
        return false;
      }
      console.log(html);
      this.$axios
        .post("/api/remark", {
          // id:uid,
          did: this.did,
          uid: this.uid,
          content: html
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "0000") {
            this.$message.success("发表帖子成功");
            this.$refs.editor.editor.txt.clear();
            this.getData();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      this.$axios.get("/api/remark/" + this.did)
      .then(res => {
        if(res.data.code == "0000") {
          this.remarks = res.data.data;
        } else {
          this.$message.error("获取评论信息失败，请重新刷新");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getDiscuss() {
      this.$axios.get("/api/discuss/" + this.did)
      .then(res => {
        if(res.data.code == "0000") {
          this.discuss = res.data.data;
        } else {
          this.$message.error("获取帖子信息失败，请刷新");
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style>
#detailEditor {
  background-color: #fff;
  border-radius: 0;
  margin-top: 20px;
  border: 1px #ccc solid;
}
.detail-title {
  margin: 0 auto;
  width: 1000px;
  font-size: 30px;
  font-weight: 600;
  color: #005097;
  margin-bottom: 15px;
}
</style>