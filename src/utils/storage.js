import Vue from 'vue'

console.log('storage is startup')
const store = window.sessionStorage
class StoreMethod {
  set (key, val) {
    if (key && typeof key === 'string') {
      store.setItem(key, JSON.stringify(val))
    }
    return this
  }
  get (key) {
    const value = store.getItem(key)
    if (typeof value !== 'string') {
      return undefined
    }
    try {
      return JSON.parse(value)
    } catch (e) {
      return value || undefined
    }
  }
  remove (key) {
    const val = this.get(key)
    store.removeItem(key)
    return val
  }
  has (key) {
    let result = false
    if (this.get(key) && this.get(key) !== 'undefined') {
      result = true
    }
    return result
  }
  clear () {
    store.clear()
    return this
  }
}
Object.defineProperty(Vue.prototype, '$storage', {
  value: new StoreMethod()
})

console.log('storage is finsih ' + Vue.prototype.$storage)
