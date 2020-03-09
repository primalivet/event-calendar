import { useContext } from 'react'
import moment from 'moment-timezone'

import { EventsContext } from '../EventsContext'

const useFilterSummary = () => {
const { startDate, endDate, onlyStartDate, today, tomorrow } = useContext(EventsContext)
  let summary = `Events that occur ${onlyStartDate ? 'only' : ''} `

  if (startDate && !onlyStartDate && !endDate) {
    if (startDate === today.format('YYYY-MM-DD')) {
      summary += 'from today and forward'
    } else if (startDate === tomorrow.format('YYYY-MM-DD')) {
      summary += 'from tomorrow and forward'
    } else {
      summary += `from ${moment(startDate).format('YYYY-MM-DD')} and forward`
    }
  } else if (startDate && onlyStartDate) {
    if (startDate === today.format('YYYY-MM-DD')) {
      summary += 'today'
    } else if (startDate === tomorrow.format('YYYY-MM-DD')) {
      summary += 'tomorrow'
    } else {
      summary += moment(startDate).format('YYYY-MM-DD')
    }
  } else if (startDate && !onlyStartDate && endDate) {
    if (startDate === today.format('YYYY-MM-DD')) {
      summary += `between today and ${moment(endDate).format('YYYY-MM-DD')}`
    } else if (startDate === tomorrow.format('YYYY-MM-DD')) {
      summary += `between tomorrow and ${moment(endDate).format('YYYY-MM-DD')}`
    } else {
      summary += `between ${moment(startDate).format('YYYY-MM-DD')} and ${moment(endDate).format('YYYY-MM-DD')}`
    }
  }

  return summary
}

export default useFilterSummary
