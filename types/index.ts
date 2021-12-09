export interface UserType {
  id?: number,
  name: string,
  email: string,
  roles: Array<string>,
  groups: Array<string>
}

export interface CategoryAttributesType {
  name: string
}

export interface CategoryRelationshipsType {
  posts: object
}

export interface CategoryType {
  id?: number,
  type: string,
  name: string,
  attributes: CategoryAttributesType,
  relationships: CategoryRelationshipsType
}

export interface CategoryFormType {
  id?: number,
  name: string
}

export interface PostAttributesType {
  title: string,
  description: string,
  content: string
}

export interface PostRelationshipsType {
  categories: object,
  users: object
}

export interface PostType {
  id: number,
  type: string,
  attributes: PostAttributesType,
  relationships: PostRelationshipsType
}

export const PostDefault: PostType = {
  id: 0,
  attributes: {
    title: '',
    description: '',
    content: ''
  },
  relationships: {
    categories: {},
    users: {}
  },
  type: 'post'
}