import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { useEventFilterState } from '../../utils/event/hooks'
import { EVENTS_QUERY } from '../../utils/event/query'
import { Card } from './Card'

export const List = () => {
  const [filters] = useEventFilterState()
  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY, {
    variables: {
      ...filters,
      first: null,
      last: null,
      before: null,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })
  
  // implement refetch for pagination

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (error) {
    console.error(error)
    return (
      <div>{error.message}</div>
    )
  }

  console.log(data)

  if (data.allEvents && !data.allEvents.edges.length) {
    return (
      <div>
        <p>Sorry, no events found, check some other dates.</p>
      </div>
    )
  }

  return (
    <div>
      {data.allEvents.edges && data.allEvents.edges.map(({ node }) => <Card key={node.id} {...node} />)}
      <div>
        {data.allEvents.pageInfo.hasPrevPage && <button>Prev</button>}
        {data.allEvents.pageInfo.hasNextPage && <button>Next</button>}
      </div>
    </div>
  )
}
