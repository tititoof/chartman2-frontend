const axios = require('axios')

export const getRoutes = () => {
    // Attention, cette fonction DOIT retourner une Promise.
    return new Promise(async (resolve, reject) => {
        // Je récupère les événements depuis mon API.
        const categories = await fetchCategories();
        const routes = [];

        for (const category of categories) {
            // Pour chaque événement, je renseigne les informations indexées à partir des données que j'ai.
            const route = {
              url: `/tutorials/category/${category.id}`,
              lastmod: new Date()
            }
            route.category = [{
              title: `${category.attributes.name}`,
            }]

            routes.push(route)

            const articles = await fetchArticlesFromCategory(category.id)

            for (const article of articles) {
              const articleRoute = {
                url: `/tutorials/article/${article.id}`,
                lastmod: new Date()
              }

              articleRoute.article = [{
                url: `/tutorials/article/${article.id}`,
                title: `${article.attributes.name}`,
                description: `${article.attributes.description}`,
                lastmod: new Date()
              }]

              routes.push(articleRoute)
            }
        }

        // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
        resolve(routes)
    })
}

const fetchCategories = async () => {
  const response = await axios.get(`${process.env.API_URL}/articles/categories`)

  return response.data.data
}

const fetchArticlesFromCategory = async (categoryId) => {
  const response = await axios.get(`${process.env.API_URL}/articles/category/${categoryId}`)

  return response.data.data
}