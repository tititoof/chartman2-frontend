import dayjs from 'dayjs'

import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

dayjs.locale('fr')

dayjs.tz.setDefault('Paris/Europe')

export default (context, inject) => {
  context.$dayjs = dayjs
  inject('dayjs', dayjs)
}
