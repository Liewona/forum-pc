<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <wang-editor :id="'test'" ref="test"></wang-editor>
    <button @click="getVal">点击我胸襟送</button>

    <hr>
    <div v-html="editorContent">
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import WangEditor from "@/components/WangEditor.vue";

export default {
  name: "Home",
  components: {
    HelloWorld, WangEditor
  },
  data() {
    return {
      editorContent: String
    }
  },
  methods: {
    getVal() {
      console.log(this.$refs);
      this.$refs.test.getVal();
      this.editorContent = this.$refs.test.editor.txt.html();
    }
  }
};
</script>
