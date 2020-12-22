import Vue from "vue";
import Router from "vue-router";

/* Layout */
import Layout from "@/views/layout/index";
import Blank from "@/views/layout/blank";

// 引入业务子模块
import list from "@/router/modules/dashboard";
Vue.use(Router);
export const constantRouterMap = [
         {
           path: "/",
           component: Layout,
           redirect: "list",
           children: list
         },
         // 自定义指令列表
         {
           path: "/list",
           component: Layout,
           children: [
             {
               path: "",
               name: "list",
               meta: {
                 title: "自定义指令列表"
               },
               component: () => import("@/views/instructions/list")
             }
           ]
         }
       ];

export default new Router({
  routes: constantRouterMap
});
