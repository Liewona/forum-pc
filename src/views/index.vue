<template>
  <el-container direction="vertical">
    <el-container direction="vertical"
      id="main"
      class="main">

      <div class="search">

        <el-input placeholder="请输入搜索内容"
          clearable
          v-model="word"
          class="handle-input">

          <el-button type="primary"
            class="searchBtn"
            @click="search"
            slot="append"
            icon="el-icon-search">搜索帖子</el-button>

          <el-button type="primary"
            slot="append"
            class="writeBtn"
            @click="toWrite"
            icon="el-icon-edit">发表帖子</el-button>
        </el-input>
      </div>

      <div class="c-type">
        <el-radio-group v-model="tabType"
          style="margin: 20px 0 15px 0;"
          @click="handleClick">
          <el-radio-button @click="handleClick"
            label="sug">推荐</el-radio-button>
          <el-radio-button label="hot">最热</el-radio-button>
          <el-radio-button label="last">最新</el-radio-button>
        </el-radio-group>
      </div>

      <div class="body">
        <div v-for="item in data"
          :key="item.id">
          <main-body-one class="itemBox"
            :data="item"></main-body-one>
        </div>
      </div>

      <el-pagination background
        @current-change="pageChange"
        layout="prev, pager, next"
        :page-size="100"
        :hide-on-single-page="true"
        :total="100">
      </el-pagination>

    </el-container>
    <el-container class="editor"  direction="vertical">

      <el-input placeholder="请输入标题" style="margin-bottom: 10px;"
        v-model="title"
        clearable>
      </el-input>

      <wang-editor
        @pressVal="pressVal"
        ref="editor"></wang-editor>
    </el-container>
  </el-container>

</template>

<script>
import WangEditor from "@/components/WangEditor.vue";
import MainBodyOne from "@/components/index/MainBodyOne.vue";

export default {
  name: "index",
  components: {
    WangEditor,
    MainBodyOne,
  },
  props: {
    id: Number,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      editorContent: String,
      data: Array,
      word: "",
      tabType: "sug",
      api: "api/discuss",
      title: "",
    };
  },
  methods: {
    getVal() {
      console.log(this.$refs);
      this.$refs.editor.getVal();
      this.editorContent = this.$refs.editor.editor.txt.html();
    },
    search() {},
    toWrite() {
      console.log(this.$("#editor"));
      console.log(this.$("#editor").offset());
      this.$("html, body").animate(
        {
          scrollTop: this.$("#editor").offset().top
        },
        {
          duration: 500,
          easing: "swing"
        }
      );
      this.$(".w-e-text").focus();
    },
    handleClick() {
      // this.api = "api/discuss/hot";
      alert(this.tabType);
    },
    pressVal(html) {
      if(this.title == "") {
        this.$message.error("请输入标题！");
        return false;
      }
      console.log(html);
      this.$axios.post("api/discuss", {
        // id:uid,
        id: 1,
        title: this.title,
        content: html,        
      })
      .then(res => {
        if(res.data.code == "0000") {
          this.$message.success("发表帖子成功");
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    pageChange() {},
    getData() {
      this.$axios
        .get(this.api)
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
    }
  }
};
</script>

<style>
#main {
  width: 1000px;
  margin: 0 auto;
  flex: none;
  padding: 0;
}
body {
  background-color: #eee;
}
.itemBox {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
}
.editor {
  width: 1000px;
  margin: 0 auto;
  background-color: #ddd;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
}
.search {
  text-align: center;
}
div.handle-input {
  width: 700px;
  /* display: inline-block; */
}
#main .searchBtn {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  border-radius: 0;
  padding-right: 30px;
}
#main .writeBtn {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  border-radius: 0 4px 4px 0;
}
.type-item {
  display: inline-block;
  padding: 10px;
  background-color: #309efc;
  color: #fff;
}
.type-item-click {
  background-color: #309efc;
  color: #fff;
}
</style>