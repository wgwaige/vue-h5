<template>
  <transition name="slide-fade">
    <div v-show="visible"
      class="text">{{message}}</div>
  </transition>
</template>
<script>
export default {
  name: 'topToast',
  props: ['dataBase'],
  data() {
    return {
      visible: false,
      message: '',
      closed: false,
      duration: 3000,
      timer: null
    };
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  mounted() {
    this.visible = this.message !== '';
    this.startTimer();
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}
.text {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  font-size: 12px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  background: #ffebda;
  color: #ff3c00;
}
</style>

