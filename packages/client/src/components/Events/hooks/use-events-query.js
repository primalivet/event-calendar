import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const EVENTS_QUERY = gql`
  query allEvents(
    $startDate: String, 
    $endDate: String, 
    $onlyStartDate: Boolean, 
    $cursor: String, 
  ) {
    allEvents(
      startDate: $startDate, 
      endDate: $endDate, 
      onlyStartDate: $onlyStartDate, 
      after: $cursor, 
      first: 1
    ) {
      totalCount
      pageInfo {
        hasPrevPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          dates {
            start
            end
          }
        }
      }
    }
  }`

const useEventsQuery = filters => {
  const { loading, error, data, refetch, fetchMore } = useQuery(EVENTS_QUERY, {
    variables: {
      ...filters
    },
    notifyOnNetworkStatusChange: true
  })

  const lastCursor = data && data.allEvents.edges.length 
    ? data.allEvents.edges[data.allEvents.edges.length - 1].cursor
    : null

  const loadMore = () => fetchMore({
    variables: {
      cursor: lastCursor
    },
    updateQuery: (prevResult, { fetchMoreResult: newResult }) => {
      const newEdges = newResult.allEvents.edges
      const pageInfo = newResult.allEvents.pageInfo
      const newCount = newResult.allEvents.totalCount

      return newEdges.length 
        ? {
            allEvents: {
              __typename: prevResult.allEvents.__typename,
              edges: [...prevResult.allEvents.edges, ...newEdges],
              totalCount: prevResult.allEvents.totalCount + newCount,
              pageInfo
            }
          } 
        : prevResult
    }
  })

  return { loading, error, data, refetch, loadMore }
}

export default useEventsQuery


