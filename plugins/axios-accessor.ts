import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api.js'

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios)
}

export default accessor
