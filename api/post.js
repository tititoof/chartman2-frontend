export default axios => ({
  create(payload) {
    return axios.$post('/posts', { post: payload })
  },
  destroy(id) {
    return axios.$delete('/posts/' + id)
  },
  findAll() {
    return axios.$get("/posts")
  },
  find(id) {
    return axios.$get('/posts/' + id)
  },
  update(id, payload) {
    return axios.$put('/posts/' + id, { post: payload })
  }
 })