import React from 'react'

import { EventsProvider, eventsReducer, eventsInitialState  } from './EventsContext'
import EventsFilters from './EventsFilters'
import EventsList from './EventsList'

const Events = () => {
  return (
    <EventsProvider reducer={eventsReducer} initialState={eventsInitialState}>
      <EventsFilters />
      <EventsList />
    </EventsProvider>
  )
}

export default Events
