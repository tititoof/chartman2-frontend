import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { LocalScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/admin",
    "logout": "/",
    "home": "/",
    "callback": "/admin"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": false,
  "localStorage": {
    "prefix": "chartman2_auth."
  },
  "defaultStrategy": "local"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new LocalScheme($auth, {
  "token": {
    "property": "client",
    "maxAge": 1800,
    "global": true
  },
  "refreshToken": {
    "property": "refresh_token",
    "data": "refresh_token",
    "maxAge": 2592000
  },
  "user": {
    "property": "data",
    "autoFetch": false
  },
  "endpoints": {
    "login": {
      "url": "/auth/sign_in",
      "method": "post"
    },
    "logout": {
      "url": "/auth/sign_out",
      "method": "delete"
    },
    "user": {
      "url": "/auth/validate_token",
      "method": "get",
      "propertyName": "data"
    },
    "refresh": {
      "url": "/auth/sign_in",
      "method": "get"
    }
  },
  "tokenRequired": true,
  "tokenType": "bearer",
  "autoFetchUser": false,
  "name": "local"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
