<template>
  <div class="list">
     <div
      v-wechat-title="$route.meta.title"
      class="menu-container"
    ></div>
      <ul>
        <li>复制粘贴指令 v-copy</li>
        <li>长按指令 v-longpress</li>
        <li>输入框防抖指令 v-debounce</li>
        <li>禁止表情及特殊字符 v-emoji</li>
        <li>图片懒加载 v-LazyLoad</li>
        <li>权限校验指令 v-premission</li>
        <li>实现页面水印 v-waterMarker</li>
        <li>拖拽指令 v-draggable</li>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.vux-header-title-area, .vux-header .vux-header-title{font-size: 12pt;}
.list{
  width: 90%;
  margin: 0 auto;
  padding: 0;
  font-size: 11pt;
  ul{ list-style: none;}
  ul li{width: 100%;padding: 10px 0; border-bottom: 1px #f1f1f1 solid;}
}
</style>
