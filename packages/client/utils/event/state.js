import React, { useReducer } from 'react'
import moment from 'moment-timezone'

export const FILTER_START_DATE = 'FILTER_START_DATE'
export const FILTER_END_DATE = 'FILTER_END_DATE'
export const FILTER_ONLY_START_DATE = 'FILTER_ONLY_START_DATE'
export const FILTER_RESET = 'FILTER_RESET'

export const initialState = {
  startDate: moment().format('YYYY-MM-DD'),
  endDate: '',
  onlyStartDate: false
}

export const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_START_DATE:
      return { ...state, startDate: action.payload }
    case FILTER_END_DATE:
      return { ...state, endDate: action.payload }
    case FILTER_ONLY_START_DATE:
      return { ...state, onlyStartDate: action.payload }
    case FILTER_RESET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const Context = React.createContext()

export const Provider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState)
  return <Context.Provider value={value} children={children} />
}
