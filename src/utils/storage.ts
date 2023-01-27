const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // ignore
  }
}

const getItem = (key: string) => {
  try {
    localStorage.getItem(key)
  } catch (e) {
    // ignore
  }
}

export default {
  setItem,
  getItem,
}
