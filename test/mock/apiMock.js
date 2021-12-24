const apiMock = {
  articles: {
    fromCategory (id) {
      return {
        data: [
          { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '2', type: 'post', attributes: { title: 'test', description: 'test', content: 'test' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '3', type: 'post', attributes: { title: 'tt', description: 'ee', content: 'fezf' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '4', type: 'post', attributes: { title: 'dzad', description: 'dzad', content: 'dzadzad' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
        ]
      }
    },
    categories () {
      return {
        data: [{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }]
      }
    },
    category (id) {
      return {
        data: { id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }
      }
    },
    find (id) {
      return {
        data: { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
      }
    }
  },
  categories: {
    create (payload) {
      return {
        data: { id: '2', type: 'category', attributes: { name: 'test' }, relationships: { posts: { data: [] } } }
      }
    },
    destroy (id) {
      return {
        data: { id: '2', type: 'category', attributes: { name: 'test' }, relationships: { posts: { data: [] } } }
      }
    },
    findAll () {
      return {
        data: [{ id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }]
      }
    },
    find (id) {
      return {
        data: { id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }
      }
    },
    update (id, payload) {
      return {
        data: { id: '1', type: 'category', attributes: { name: 'NuxtJS' }, relationships: { posts: { data: [{ id: '1', type: 'post' }, { id: '2', type: 'post' }, { id: '3', type: 'post' }, { id: '4', type: 'post' }] } } }
      }
    }
  },
  posts: {
    create (payload) {
      return {
        data: { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
      }
    },
    destroy (id) {
      return {
        data: { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
      }
    },
    findAll () {
      return {
        data: [
          { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '2', type: 'post', attributes: { title: 'test', description: 'test', content: 'test' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '3', type: 'post', attributes: { title: 'tt', description: 'ee', content: 'fezf' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } },
          { id: '4', type: 'post', attributes: { title: 'dzad', description: 'dzad', content: 'dzadzad' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
        ]
      }
    },
    find (id) {
      return {
        data: { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
      }
    },

    update (id, payload) {
      return {
        data: { id: '1', type: 'post', attributes: { title: 'mon test', description: "C'est ma little description", content: '# Yey !!!!\n\nHello comment ça va ? ' }, relationships: { user: { data: { id: '1', type: 'user' } }, categories: { data: [{ id: '1', type: 'category' }] } } }
      }
    }
  }

}

export default apiMock
