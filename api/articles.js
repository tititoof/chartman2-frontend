export default axios => ({
  fromCategory(id) {
    return axios.$get('/articles/category/' + id)
  },
  categories() {
    return axios.$get('/articles/categories')
  },
  category(id) {
    return axios.$get('/category/' + id)
  },
  find(id) {
    return axios.$get('/article/' + id)
  },
 })