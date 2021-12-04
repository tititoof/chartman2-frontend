import Model from '~/models/Model'

export default class Category extends Model {
  
  // Set the resource route of the model
  resource() {
    return 'categories'
  }
}