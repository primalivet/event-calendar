const { gql } = require('apollo-server')

// TODO: paginate and date filters in events query
// Event date filers should include startDate, endDate and onlyStartDate which
// should only pick events that happens on the specific startDate
module.exports = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    endCursor: String!
    startCursor: String!
  }

  type DateTimeRange {
    start: String!
    end: String
  }

  type EventPayload {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [EventEdge]
  }

  type EventEdge {
    node: EventNode!
    cursor: String!
  }

  type EventNode {
    id: Int!
    title: String!
    dates: [DateTimeRange]
    tags: [String]
  }

  type Query {
    allEvents(
      today: String,
      startDate: String,
      endDate: String,
      onlyStartDate: Boolean,
      after: Int,
      before: Int,
      first: Int,
      last: Int
    ): EventPayload
  }
`
