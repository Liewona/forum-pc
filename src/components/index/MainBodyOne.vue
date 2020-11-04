<template>
  <div>
    <div class="title">
      <span class="title-text"
        @click="titleClick"
        v-text="data.title"></span>
    </div>
    <div class="contextBody"
      v-html="content">
    </div>
    <div class="imgBox"
      id="imgBox"
      v-if="imgSrcs.length >= 1">
      <img v-show="imgSrcs[0]"
        :src="imgSrcs[0]"
        alt="">
      <img v-show="imgSrcs[1]"
        :src="imgSrcs[1]"
        alt="">
      <img v-show="imgSrcs[2]"
        :src="imgSrcs[2]"
        alt="">
      <!-- <img src="@/assets/img/3.jpg" alt="" />
      <img src="@/assets/img/03.jpg" alt="" />
      <img src="@/assets/img/003.jpg" alt="" /> -->
    </div>
    <box-footer :data="data"></box-footer>
  </div>
</template>

<script>
import BoxFooter from "@/components/index/BoxFooter.vue";

//去掉所有html标签

// str.replace(/<[^>]*>|<\/[^>]*>/gm, "");

//保留img标签

// str.replace(/<(?!img).*?>/g, "");

//保留img和p 标签

// str.replace(/<(?!img|p|/p).*?>/g, "");
/*

var reg = /<img[^>]+src="[^"]+"[^>]*>/g;
var result = s.match(reg);    //获得所有的img标签
for (var i=0; i<result.length; i++) {
  var reg2 = /src="([^"]+)"/;
  var result2 = reg2.exec(result);  //匹配src
  alert(RegExp.$1);  
}

*/

export default {
  components: {
    BoxFooter
  },
  props: {
    data: Object
  },
  created() {
    this.content = this.data.content.replace(/<[^>]*>|<\/[^>]*>/gm, "");
    var reg = /<img[^>]+src="[^"]+"[^>]*>/g;
    var result = this.data.content.match(reg); //获得所有的img标签
    if (result) {
      for (var i = 0; i < result.length; i++) {
        // var reg2 = /src="([^"]+)"/g;
        // var result2 = reg2.exec(result); //匹配src
        // alert(RegExp.$1);
        // console.log(result2)
        // console.log(reg2.exec(result[i]))

        var reg2 = new RegExp(/src="([^"]*)"/g);
        var arr = reg2.exec(result[i]);
        this.imgSrcs.push(arr[1]);
      }
    }
  },
  data() {
    return {
      content: String,
      imgSrcs: []
    };
  },
  methods: {
    titleClick() {
      var id = this.data.id;
      console.log(id);
      this.$router.push({
        name: "ForumDetail", // discuss/id
        params: {id: id}
      });

    },
    personClick() {
      return false;
    }
  }
};
</script>

<style>
.title {
  font-size: 24px;
  margin-bottom: 10px;
}
.title .title-text {
  color: #005097;
  cursor: pointer;
  font-family: STHeiti, "Microsoft Yahei", "Microsoft YaHei", Arial, sans-serif;
}
.title-text:hover {
  text-decoration: underline;
}
.contextBody {
  line-height: 28px;
  font-size: 16px;
}
.authorMsg {
  color: #333;
  padding: 0 10px;
  font-size: 14px;
}
.authorMsg .title-text {
  color: #333;
}
.authorMsg i {
  margin-right: 5px;
}
.imgBox {
  /* text-align: center; */
}
.imgBox img {
  width: 305px;
  height: 190px;
  margin: 10px;
}
</style>