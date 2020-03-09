import React from 'react'

import { useEventsQuery, useEventsFilters } from './hooks'
import { Card } from '../'

const EventsList = () => {
  const { startDate, endDate, onlyStartDate } = useEventsFilters()
  const { loading, error, data, loadMore } = useEventsQuery({ startDate, endDate, onlyStartDate })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error && error.message}</div>
  }

  return (
    <div>
      { data &&
        <div>
          {data.allEvents.edges.map(edge => <Card key={edge.node.id} {...edge.node} />)}
        </div>
      }
      { data.allEvents.pageInfo.hasNextPage && <button onClick={loadMore}>Load more</button>}
    </div>
  )
}

export default EventsList
