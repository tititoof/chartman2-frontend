import Auth from "@/api/auth"
import Blog from "@/api/blog"
import Settings from "@/api/settings"

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    blog: Blog(context.$axios),
    settings: Settings(context.$axios)
  }

  // Inject $api
  inject('api', factories)
};