// storage.js — localStorage-backed key/value store
// Mirrors the window.storage API used in the Claude artifact

export const storage = {
  get(key) {
    try {
      const value = localStorage.getItem(key)
      if (value === null) throw new Error('Key not found')
      return Promise.resolve({ key, value })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value)
      return Promise.resolve({ key, value })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  delete(key) {
    try {
      localStorage.removeItem(key)
      return Promise.resolve({ key, deleted: true })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  list(prefix = '') {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix))
      return Promise.resolve({ keys, prefix })
    } catch (e) {
      return Promise.reject(e)
    }
  },
}
