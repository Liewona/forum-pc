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
        <span class="reback"
          id="rebackTag"
          @click="rebackClick">{{rebackTag}}</span>
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
    this.did = this.$route.params.id;
  },
  props: {
    data: Object
  },
  data() {
    return {
      clickReback: false,
      did: Number,
      rebackTag: "回复"
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
      this.$("html, body").animate(
        {
          scrollTop: this.$("#detailEditor").offset().top
        },
        {
          duration: 500,
          easing: "swing"
        }
      );
      this.$(".w-e-text").focus();
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
  transition: 1s all linear;
}
.he-zero {
  height: 0;
  overflow: hidden;
}
.el-main::-webkit-scrollbar {
  display: none; /* Chrome Safari */
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