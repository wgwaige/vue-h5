import Vue from 'vue';

console.log('localStorage is startup');
const localStore = window.localStorage;
class localStoreMethod {
  set(key, val) {
    if (key && typeof key === 'string') {
      localStore.setItem(key, JSON.stringify(val));
    }
    return this;
  }
  get(key) {
    const value = localStore.getItem(key);
    if (typeof value !== 'string') {
      return undefined;
    }
    try {
      //  alert( (typeof value) + ' '  + JSON.parse(value) + ' ' + (typeof JSON.parse(value)) + ' '+ value);
      //  alert(typeof JSON.parse(value));
      return JSON.parse(value);
    } catch (e) {
      return value || undefined;
    }
  }
  remove(key) {
    const val = this.get(key);
    localStore.removeItem(key);
    return val;
  }
  has(key) {
    let result = false;
    if (this.get(key) && this.get(key) !== 'undefined') {
      result = true;
    }
    return result;
  }
  clear() {
    localStore.clear();
    return this;
  }
}
Object.defineProperty(Vue.prototype, '$localStorage', {
  value: new localStoreMethod()
});

console.log('localStore is finsih ' + Vue.prototype.$localStorage);
