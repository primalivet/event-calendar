import React, { useReducer } from 'react'
import moment from 'moment-timezone'

export const EVENTS_START_DATE      = 'EVENTS_START_DATE'
export const EVENTS_END_DATE        = 'EVENTS_END_DATE'
export const EVENTS_ONLY_START_DATE = 'EVENTS_ONLY_START_DATE'
export const EVENTS_RESET           = 'EVENTS_RESET'

export const eventsInitialState = {
  startDate: moment().format('YYYY-MM-DD'),
  endDate: '',
  onlyStartDate: false
}

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case EVENTS_START_DATE:
      return { ...state, startDate: action.payload }
    case EVENTS_END_DATE:
      // TODO: Validate that endDate isSameOrAfter startDate
      return { ...state, onlyStartDate: false, endDate: action.payload }
    case EVENTS_ONLY_START_DATE:
      return { ...state, endDate: '', onlyStartDate: !state.onlyStartDate }
    case EVENTS_RESET:
      return { ...eventsInitialState }
    default:
      return state
  }
}

export const EventsContext = React.createContext()

export const EventsProvider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState)
  return <EventsContext.Provider value={value} children={children} />
}

