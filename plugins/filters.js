import Vue from 'vue'

Vue.filter('truncate', (text, length, clamp) => {
  clamp = clamp || '...'
  const node = document.createElement('div')
  node.innerHTML = text
  const content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
})

Vue.filter('length', (data) => {
  if (Array.isArray(data)) {
    return data.length
  }
  return 0
})
