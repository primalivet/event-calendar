import { gql } from 'apollo-boost'

export const EVENTS_QUERY = gql`
  query allEvents(
    $startDate: String, 
    $endDate: String, 
    $onlyStartDate: Boolean, 
    $after: Int, 
    $before: Int, 
    $first: Int, 
    $last: Int
  ) {
    allEvents(
      startDate: $startDate, 
      endDate: $endDate, 
      onlyStartDate: $onlyStartDate, 
      after: $after, 
      before: $before, 
      first: $first, 
      last: $last
    ) {
      totalCount
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
