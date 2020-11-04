<template>
  <div>

    <div id="editor" class="main-editor">
      <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
    </div>
    <br>
    <el-button @click="submit" type="primary">发表</el-button>
    <span :class="{fontRed:isRed}" style="display: inline-black; float: right; line-height:40px;">{{now}}/800</span>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "wangeditor",
  props: {
    id: String
  },
  mounted() {
    this.editor = new E(`#editor`);
    this.editor.config.uploadFileName = "upfile";
    // this.editor.customConfig.uploadFileName = "upfile";
    this.editor.config.uploadImgServer = "api/up/dis";
    this.editor.create();
  },
  data() {
    return {
      editor: Object,
      now: 0,
      isRed: false
    };
  },
  methods: {
    getVal() {
      console.log(this.editor.txt.text());
      console.log(this.editor.txt.html());
    },
    submit() {
      var html = this.editor.txt.html();
      if(this.now > 800) {
        this.$message.error("发表内容过多，请修改");
        return false;
      }
      this.$emit("pressVal", html);
    }
  },
  watch: {
    editor: {
      deep: true,
      handler(newVal, oldVal) {
        this.now = newVal.txt.html().length;
        if(this.now >= 800) {
          console.log(this.now)
          console.log(newVal, oldVal)
          this.editor = oldVal; 
          this.isRed = true;
        } else {
          this.isRed = false;
        }
      }
    },
  }
  
};
</script>

<style>
.fontRed {
  color: red;
}
</style>