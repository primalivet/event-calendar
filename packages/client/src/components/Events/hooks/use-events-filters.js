import { useContext } from 'react'
import moment from 'moment-timezone'

import { 
  EventsContext, 
  EVENTS_START_DATE, 
  EVENTS_END_DATE, 
  EVENTS_ONLY_START_DATE, 
  EVENTS_RESET } from '../EventsContext'

const useEventsFilters = () => {
  const [filters, dispatch] = useContext(EventsContext)
  const today = moment()
  const tomorrow = moment().add(1, 'days')

  const handleStartDate = e => 
    dispatch({ type: EVENTS_START_DATE, payload: e.target.value })

  const handleEndDate = e => 
    dispatch({ type: EVENTS_END_DATE, payload: e.target.value })

  const handleToday = () => 
    dispatch({ type: EVENTS_START_DATE, payload: today.format('YYYY-MM-DD') })

  const handleTomorrow = () => 
    dispatch({ type: EVENTS_START_DATE, payload: tomorrow.format('YYYY-MM-DD') })

  const handleOnlyStartDate = () => 
    dispatch({ type: EVENTS_ONLY_START_DATE })

  const handleClearEndDate = () => 
    dispatch({ type: EVENTS_END_DATE, payload: '' })

  const handleReset = () => 
    dispatch({ type: EVENTS_RESET })

  return {
    ...filters,
    today,
    tomorrow,
    handleStartDate,
    handleEndDate,
    handleToday,
    handleTomorrow,
    handleOnlyStartDate,
    handleClearEndDate,
    handleReset
  }
}

export default useEventsFilters
