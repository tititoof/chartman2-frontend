export default axios => ({
  create (payload) {
    return axios.$post('/categories', payload)
  },
  destroy (id) {
    return axios.$delete('/categories/' + id)
  },
  findAll () {
    return axios.$get('/categories')
  },
  find (id) {
    return axios.$get('/categories/' + id)
  },
  update (id, payload) {
    return axios.$put('/categories/' + id, payload)
  }
})
