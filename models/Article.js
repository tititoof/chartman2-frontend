import Model from './Model'

export default class Article extends Model {
  
  // Set the resource route of the model
  resource() {
    return 'articles'
  }
}