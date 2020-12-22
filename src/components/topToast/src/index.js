import Vue from 'vue';
import Main from './index.vue';
const TopToastConstructor = Vue.extend(Main);
let instance;
const TopToast = function (options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  instance = new TopToastConstructor({
    data: options
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
};
export default TopToast;
