import React from 'react'

export const Card = (props) => {
  const { id, title, dates } = props

  return (
    <div>
      <h3>{title}</h3><br />
      {dates.map(({start, end}, i) =>
        <div key={id + i}>
          <strong>Day</strong>
          <br />
          <span>start</span>
          <br />
          <span>{start}</span>
          <br />
          <span>end</span>
          <br />
          <span>{end}</span>
        </div>
      )}
    </div>
  )
}
