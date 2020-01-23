const moment = require('moment-timezone')

const { fakeEvents } = require('../data')

module.exports = {
  Query: {
    allEvents: (user, args) => {
      const { today, tomorrow, startDate, endDate, onlyStartDate, first, after, last, before } = args
      const PER_PAGE = 3
      let cursor = null
      let events = fakeEvents

      if (first && last || after && before) {
        throw new Error('Cant use both first and last or before and after, combine first with after and last with before')
      }

      // filter out events that only has occured before today
      // TODO: test
      events = events.filter(event => {
        const eventStartDates = event.dates.filter(date => moment(date.start).isAfter(today))
        if (!eventStartDates.length) {
          return false
        }
        return true
      })

      events = events.map(event => {
        event.dates = event.dates.filter(data => moment(data.start).isAfter(today))
        return event
      })

      // filter depending on date arguments
        /*
      if (startDate && endDate) {

      } else if (startDate && onlyStartDate) {

      } else if (startDate) {
      } else {

      }
      */

      // filter depending on pagination arguments
      if (first && after) {
        cursor = events.findIndex(event => event.id === after)
        events = events.filter(event => event.id > after && event.id <= after + first)
      } else if (last && before) {
        cursor = events.findIndex(event => event.id === before)
        events = events.filter(event => event.id < before && event.id >= before - last)
      } else if (first) {
        events = events.filter(event => event.id <= first)
      } else {
        events = events.filter(event => event.id <= PER_PAGE)
      }

      return {
        totalCount: fakeEvents.length,
        pageInfo: {
          count: events.length,
          hasPrevPage: false,
          hasNextPage: false,
          startCursor: events.length && events[0].id,
          endCursor: events.length && events[events.length - 1].id
        },
        edges: events.length ? events.map(node => ({ node, cursor: node.id })) : []
      }
    }
  }
}
