import React from 'react'

import { Provider, reducer, initialState } from '../utils/event/state'
import { Filter } from '../components/event/Filter'
import { List } from '../components/event/List'

const Events = () => {
  return (
    <>
      <Provider reducer={reducer} initialState={initialState}>
        <Filter />
        <List />
      </Provider>
    </>
  )
}

export default Events
