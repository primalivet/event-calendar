import React from 'react'
import { useEventsFilters, useEventsFiltersSummary } from './hooks'

const EventsFilters = () => {
  const filterSummary = useEventsFiltersSummary()
  const filters = useEventsFilters()

  return (
    <div>
      <h2>{filterSummary}</h2>
      <div>
        <label htmlFor='filter-start-date'>Start date</label><br />
        <input id='filter-start-date' type='date' value={filters.startDate} onChange={filters.handleStartDate} />
        <button onClick={filters.handleToday}>Today</button>
        <button onClick={filters.handleTomorrow}>Tomorrow</button>
        <label htmlFor='filter-only-start-date'>Only this date</label>
        <input id='filter-only-start-date' type='checkbox' checked={filters.onlyStartDate} onChange={filters.handleOnlyStartDate} />
      </div>
      <div>
        <label htmlFor='filter-end-date'>End date</label><br />
        <input id='filter-end-date' type='date' value={filters.endDate} onChange={filters.handleEndDate} />
        <button onClick={filters.handleClearEndDate}>Clear end date</button>
      </div>
      <div>
        <button onClick={filters.handleReset}>Reset dates</button>
      </div>
    </div>
  )
}

export default EventsFilters
