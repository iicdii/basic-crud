const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // ignore
  }
}

const getItem = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    // ignore
  }
}

const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    // ignore
  }
}

export default {
  setItem,
  getItem,
  removeItem,
}
