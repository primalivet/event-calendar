const moment = require('moment-timezone')

const { fakeEvents } = require('../data')

module.exports = {
  Query: {
    allEvents: (user, args) => {
      const { startDate, endDate, onlyStartDate, first, after, last, before } = args
      const today = moment().format('YYYY-MM-DD')
      const PER_PAGE = 3

      let events = fakeEvents
      let totalCount = 0
      let firstInTotal = null
      let lastInTotal = null
      let count = 0
      let startCursor = ''
      let endCursor = ''
      let hasNextPage = false
      let hasPrevPage = false

      if ((first && last) || (after && before) || (first && before) || (last && after)) {
        throw new Error('Cant use both first and last or before and after, combine first with after and last with before')
      }

      // filter out events that only has occured before today
      events = events.filter(event => {
        const eventStartDates = event.dates.filter(date => moment(date.start).isSameOrAfter(today))
        if (!eventStartDates.length) {
          return false
        }
        return true
      })

      // filter out specific event dates that occured before today
      events = events.map(event => {
        event.dates = event.dates.filter(data => moment(data.start).isAfter(startDate))
        return event
      })

      // filter depending on date arguments
      if (startDate && onlyStartDate) {
        events = events.filter(event => {
          const eventDatesStart = event.dates.filter(date => {
            return moment(date.start).isSame(startDate, 'day')
          })
          if (!eventDatesStart.length) {
            return false
          }
          return true
        })
      } else if (startDate && endDate) {
        events = events.filter(event => {
          const eventDatesRange = event.dates.filter(date => {
            return moment(date.start).isSameOrAfter(startDate) &&
                   moment(date.end).isSameOrBefore(endDate)
          })
          if (!eventDatesRange.length) {
            return false
          }
          return true
        })
      } else if (startDate) {
        events = events.filter(event => {
          const eventDatesStart = event.dates.filter(date => {
            return moment(date.start).isSameOrAfter(startDate)
          })
          if (!eventDatesStart.length) {
            return false
          }
          return true
        })
      }

      // store totalCount before pagination
      if (events.length) {
        totalCount = events.length
        firstInTotal = events[0].id
        lastInTotal = events[events.length - 1].id
      }

      // filter depending on pagination arguments
      if (events.length) {
        if (first && after) {
          events = events
            .filter(event => event.id > after)
            .filter((event, i) => i < first)
        } else if (last && before) {
          events = events
            .filter(event => event.id < before)
            .slice(-last)
        } else if (first) {
          events = events.filter((event, i) => i < first)
        } else {
          events = events.filter((event, i) => i < PER_PAGE)
        }
      }

      if (events.length) {
        count = events.length
        startCursor = events.length && events[0].id
        endCursor = events.length && events[events.length - 1].id

        hasPrevPage = (totalCount !== events.length) && (firstInTotal !== startCursor)
        hasNextPage = (totalCount !== events.length) && (lastInTotal !== endCursor)
      }

      return {
        totalCount,
        pageInfo: { count, hasNextPage, hasPrevPage, startCursor, endCursor },
        edges: events.length ? events.map(node => ({ node, cursor: node.id })) : []
      }
    }
  }
}
