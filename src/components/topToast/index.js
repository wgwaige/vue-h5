import TopToast from './src';
const install = function (Vue) {
  Vue.component(TopToast.name, TopToast);
  Vue.prototype.$topToast = TopToast;
};
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default install;
