export const setItem = (key: string, value: string) => {
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getItem = (key: string) => {
  const value = <string>localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}

export function getQueryVariable(variable: string) {
  var query = window.location.search.substring(1)
  var vars = query.split("&")
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
