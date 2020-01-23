import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql, NetworkStatus } from 'apollo-boost'

import { useEventFilterState } from '../../utils/event/hooks'
import { Card } from './Card'

const EVENTS_QUERY = gql`
  query allEvents($after: Int, $before: Int, $first: Int, $last: Int) {
    allEvents(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        hasPrevPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          dates {
            start
            end
          }
          tags
        }
        cursor
      }
    }
  }`

export const List = () => {
  const [{ today, tomorrow, startDate, endDate, onlyStartDate }] = useEventFilterState()
  const { loading, error, data } = useQuery(EVENTS_QUERY, { 
    variables: {
      today,
      tomorrow,
      startDate,
      endDate,
      onlyStartDate,
      first: null,
      last: null,
      before: null,
      after: null,
    },
    notifyOnNetworkStatusChange: true 
  })

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
    </div>
  )
}
