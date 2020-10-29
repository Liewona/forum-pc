<template>
  <div :id="id" style="width:800px; height: 400px">
     <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
  </div>
</template>

<script>
import E from 'wangeditor';

export default {
  name: 'wangeditor',
  props: {
    id: String
  },
  mounted() {
    if(this.id == undefined) {
      this.id = '123';
    }
    this.editor = new E(`#${this.id}`);
    this.editor.config.uploadImgServer = '/upload-img'
    this.editor.create();
  },
  data() {
    return {
      editor: Object,
    }
  },
  methods: {
    getVal() {
      console.log(this.editor.txt.text());
      console.log(this.editor.txt.html());
    }
  }
}
</script>

<style>

</style>