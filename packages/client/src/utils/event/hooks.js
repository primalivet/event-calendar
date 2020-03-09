import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment-timezone'

import { Context } from './state'

export const useEventFilterState = () => useContext(Context)

