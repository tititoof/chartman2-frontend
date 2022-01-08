export default function (context) {
  
  context.$axios.onRequest((config) => {
    if (config.headers && config.headers.hasOwnProperty('client') && typeof context.$cookies !== 'undefined') {
      try {
        config.headers.client = (typeof context.$cookies.get('client') == 'undefined') ? '' : context.$cookies.get('client')
        config.headers['access-token'] = (typeof context.$cookies.get('access-token') == 'undefined') ? '' : context.$cookies.get('access-token')
        config.headers.uid = (typeof context.$cookies.get('uid') == 'undefined') ? '' : context.$cookies.get('uid')
        config.headers['token-type'] = (typeof context.$cookies.get('token-type') == 'undefined') ? '' : context.$cookies.get('token-type')
      } catch (e) {
        console.log(e)
        console.log(context)
      }
    }
  })

  context.$axios.onResponse((response) => {
    if (response.headers && response.headers.hasOwnProperty('client')) {
      try {
        context.$cookies.set('access-token', response.headers['access-token'])
        context.$cookies.set('client', response.headers.client)
        context.$cookies.set('uid', response.headers.uid)
        context.$cookies.set('token-type', response.headers['token-type'])
      } catch (e) {
        console.log(e)
        console.log(context)
      }
    }

    return response
  })
}
