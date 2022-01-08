export interface CategoryType {
  id?: string,
  type: 'category',
  name: string,
  attributes: {
    name: string
  },
  relationships: {
    posts: {
      data: {
        id: string,
        type: 'post'
      }
    }
  }
}

export const CategoryDefault: CategoryType = {
  type: 'category',
  name: '',
  attributes: {
    name: ''
  },
  relationships: {
    posts: {
      data: {
        id: '0',
        type: 'post'
      }
    }
  }
}

export interface CategoryFormType {
  id?: string,
  name: string
}

export const CategoryFormDefault: CategoryFormType = {
  name: ''
}

export interface CategoryFormErrorType {
  name: Array<object>
}

export const CategoryFormErrorDefault: CategoryFormErrorType = {
  name: []
}

export interface PostType {
  id: string,
  type: string,
  attributes: {
    title: string,
    description: string,
    content: string
  },
  relationships: {
    categories: {
      data: {
        [index: number]: {
          id: number,
          type: 'category'
        }
      }
    },
    users: {
      data: {
        [index: number]: {
          id: number,
          type: 'user'
        }
      }
    }
  }
}

export const PostDefault: PostType = {
  id: '',
  attributes: {
    title: '',
    description: '',
    content: ''
  },
  relationships: {
    categories: {
      data: []
    },
    users: {
      data: []
    }
  },
  type: 'post'
}

export interface PostFormType {
  id?: string,
  title: string,
  description: string,
  content: string
  categories: Array<number>
}

export const PostFormDefault: PostFormType = {
  title: '',
  description: '',
  content: '',
  categories: []
}

export interface PostFormErrorType {
  title: Array<Object>,
  description: Array<Object>,
  content: Array<Object>,
  categories: Array<Object>
}

export const PostFormErrorDefault: PostFormErrorType = {
  title: [],
  description: [],
  content: [],
  categories: []
}

export interface UserType {
  id?: string,
  name: string,
  email: string,
  roles: Array<string>,
  groups: Array<string>
}
