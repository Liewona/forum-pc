<template>
  <el-container class="detail-main">
    <el-aside style="width:200px; background-color: #ddd">
      <div style="margin: 20px auto 10px auto; width: 100px;">
        <el-avatar :size="100"
          shape="square"></el-avatar>
      </div>

      <div class="name-tag detail-item-name"
        :uid="data.uid"
        @click="clickUser"
        v-text="data.uname"></div>
    </el-aside>

    <el-main>
      <div class="item-main"
        v-html="data.content">

      </div>
      <div class="item-footer">
        <span><i class="el-icon-time"></i>{{data.createTime}}</span>
        <span :class="['reback', {'reback-click': isRebackTagBg}]"
          @click="rebackClick">{{rebackTag}}</span>
      </div>
      <div ref="rebackBox"
        class="reback-box">
        <div v-for="item in replys">
          <reback-item :data="item"
            @showWriter="changeEditorShowState"></reback-item>
        </div>

        <div v-if="replys.length > 0"
          style="text-align:right; margin-top: 3px; margin-bottom: 5px; padding: 0 20px;">
          <el-button type="normarl"
            @click="sayToWrite"
            size="mini">我也说一句</el-button>
        </div>

        <div v-show="replyEditorShow"
          class="replyInputBox">
          <el-input type="textarea"
            placeholder="请输入内容"
            clearable
            v-model="replyContent"
            maxlength="40"
            show-word-limit></el-input>
          <div style="text-align:right; margin-top:8px;">
            <el-button style="font-size:12px;"
              size="mini"
              @click="sayReply"
              type="primary">确认回复</el-button>
          </div>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import RebackItem from "@/components/forums/RebackItem.vue";

export default {
  components: {
    RebackItem
  },
  created() {
    // this.fromId = uid;
    this.fromId = 1;
    this.did = this.$route.params.id;
    this.getReplyData();
  },
  props: {
    data: Object
  },
  data() {
    return {
      clickReback: false,
      did: Number,
      rebackTag: "回复",
      isRebackTagBg: false,
      replys: [],
      replyEditorShow: false,
      toId: Number,
      toName: "",
      fromId: Number,
      replyContent: "",
      reg: ""
    };
  },
  methods: {
    clickUser() {
      this.$router.push({
        name: "UserSpace",
        params: {
          id: this.data.uid
        }
      });
    },
    rebackClick() {
      if (!this.clickReback) {
        if (this.replys.length > 0) {
          this.$refs.rebackBox.style.paddingTop = "4px";
          this.$refs.rebackBox.style.height =
            this.replys.length * 56 + 38 + "px";
        } else {
          this.replyEditorShow = !this.replyEditorShow;
          // this.$refs.rebackBox.style.paddingTop = "4px";
          this.$refs.rebackBox.style.height = "100px";
          // this.$refs.rebackBox.style.height = (this.replys.length * 44 + 110) + "px";
        }
        setTimeout(() => {
          this.rebackTag = "收起回复";
          this.isRebackTagBg = !this.isRebackTagBg;
        }, 800);
      } else {
        this.$refs.rebackBox.style.paddingTop = "0px";
        this.$refs.rebackBox.style.height = "0px";
        setTimeout(() => {
          this.rebackTag = "回复";
          this.isRebackTagBg = !this.isRebackTagBg;
        }, 800);
      }

      this.clickReback = !this.clickReback;
    },
    getReplyData() {
      this.$axios
        .get("/api/reply/" + this.data.id)
        .then(res => {
          if (res.data.code == "0000") {
            this.replys = res.data.data;
            if(this.replyEditorShow) {
              this.reShowReplyBox();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeEditorShowState(flag, to) {
      // this.sayToWrite();
      this.toId = to.to;
      this.toName = to.toName;
      this.reg = "@ " + to.toName + "：";
      this.replyContent = "@ " + to.toName + "：";

      if (!this.replyEditorShow) {
        this.sayToWrite();
      }
    },
    sayToWrite() {
      if (!this.replyEditorShow) {
        this.$refs.rebackBox.style.height =
          this.replys.length * 56 + 138 + "px";
        this.replyEditorShow = true;
      } else {
        this.$refs.rebackBox.style.height = this.replys.length * 56 + 38 + "px";

        setTimeout(() => {
          this.replyEditorShow = false;
          this.replyContent = "";
        }, 800);
      }
    },
    sayReply() {
      var content = this.replyContent.replace(this.reg, "");
      console.log(content);
      this.$axios
        .post("/api/reply", {
          fromId: this.fromId,
          toId: this.toId,
          content: content,
          remarkId: this.data.id
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.$message.success("回复成功");
            this.replyContent = "";
            this.getReplyData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reShowReplyBox() {
      this.$refs.rebackBox.style.height = this.replys.length * 56 + 138 + "px";
    }
  }
};
</script>

<style>
.detail-main {
  width: 1000px;
  margin: 0 auto;
  padding: 0;
  background-color: #fff;
  border: #ccc 1px solid;
  box-sizing: border-box;
}

.detail-item-name {
  text-align: center;
}
.item-footer {
  text-align: right;
}
.item-main {
  min-height: 120px;
}
.item-footer i {
  margin-right: 5px;
}
.reback {
  margin-left: 30px;
  padding: 10px;
  color: #1d53bf;
  cursor: pointer;
}
.reback-click {
  background-color: #f7f8fa;
}
.reback-box {
  background-color: #f7f8fa;
  width: 500px;
  height: 0;
  /* min-height: 50px; */
  /* height: 200px; */
  /* max-height: 100px; */
  float: right;
  margin-top: 9px;
  overflow: hidden;
  transition: 0.8s all linear;
}
.he-zero {
  height: 0;
  overflow: hidden;
}
.el-main::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.replyInputBox {
  padding: 5px 20px 10px 5px;
}

/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul,
ol {
  margin: 10px 0 10px 20px;
}
</style>