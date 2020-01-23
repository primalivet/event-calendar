import React from 'react'
import moment from 'moment-timezone'

import {
  FILTER_START_DATE,
  FILTER_END_DATE,
  FILTER_ONLY_START_DATE,
  FILTER_RESET
} from '../../utils/event/state'
import { useEventFilterState, useEventFilterHumanReadableSummary } from '../../utils/event/hooks'

export const Filter = () => {
  const today = moment()
  const tomorrow = moment().add(1, 'days')

  const [{ startDate, endDate, onlyStartDate }, dispatch] = useEventFilterState()
  const filterSummary = useEventFilterHumanReadableSummary(startDate, endDate, onlyStartDate, today, tomorrow)

  // TODO: start date must be today or after today
  const handleStartDate = e => {
    dispatch({ type: FILTER_START_DATE, payload: e.target.value })
  }

  // TODO: end date must be after start date
  const handleEndDate = e => {
    dispatch({ type: FILTER_ONLY_START_DATE, payload: false })
    dispatch({ type: FILTER_END_DATE, payload: e.target.value })
  }

  const handleOnlyStartDate = () => {
    dispatch({ type: FILTER_END_DATE, payload: '' })
    dispatch({ type: FILTER_ONLY_START_DATE, payload: !onlyStartDate })
  }

  const handleToday = () => {
    dispatch({ type: FILTER_START_DATE, payload: today.format('YYYY-MM-DD') })
  }

  const handleTomorrow = () => {
    dispatch({ type: FILTER_START_DATE, payload: tomorrow.format('YYYY-MM-DD') })
  }

  const handleClearEndDate = () => {
    dispatch({ type: FILTER_END_DATE, payload: '' })
  }

  const handleResetDates = () => {
    dispatch({
      type: FILTER_RESET,
      payload: {
        startDate: today.format('YYYY-MM-DD'),
        endDate: '',
        onlyStartDate: false
      }
    })
  }

  return (
    <div>
      <h2>{filterSummary}</h2>
      <div>
        <label htmlFor='filter-start-date'>Start date</label><br />
        <input id='filter-start-date' type='date' value={startDate} onChange={handleStartDate} />
        <button onClick={handleToday}>Today</button>
        <button onClick={handleTomorrow}>Tomorrow</button>
        <label htmlFor='filter-only-start-date'>Only this date</label>
        <input id='filter-only-start-date' type='checkbox' checked={onlyStartDate} onChange={handleOnlyStartDate} />
      </div>
      <div>
        <label htmlFor='filter-end-date'>End date</label><br />
        <input id='filter-end-date' type='date' value={endDate} onChange={handleEndDate} />
        <button onClick={handleClearEndDate}>Clear end date</button>
      </div>
      <div>
        <button onClick={handleResetDates}>Reset dates</button>
      </div>
    </div>
  )
}
