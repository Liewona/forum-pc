import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue"
import ForumDetail from "@/views/ForumDetail.vue"
// import Home from "../views/Home.vue";
import Index from "@/views/Index.vue";
import Mine from "@/views/Mine/Mine.vue";
import MineIndex from "@/views/Mine/MineIndex.vue";
import MineInfo from "@/views/Mine/MineInfo.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/discuss/:id",
    name: "ForumDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ForumDetail,
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue")
    
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path:"/mine",
    name:"Mine",
    component: Mine,
    redirect:'/mineIndex',
    children:[
      {
        path:"/mineIndex",
        name:"MineIndex",
        component:MineIndex
      },
      {
        path:"/mineInfo",
        name:"MineInfo",
        component:MineInfo
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
