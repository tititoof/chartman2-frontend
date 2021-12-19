export default function (context) {
  context.$axios.onRequest((config) => {
    try {
      config.headers.client = context.$cookies.get('client')
      config.headers['access-token'] = context.$cookies.get('access-token')
      config.headers.uid = context.$cookies.get('uid')
      config.headers['token-type'] = context.$cookies.get('token-type')
    } catch (e) {
      console.log(e)
      console.log(context)
    }
  })

  context.$axios.onResponse((response) => {
    if (response.headers.client) {
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
