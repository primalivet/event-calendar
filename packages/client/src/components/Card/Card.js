import React from 'react'

const Card = (props) => {
  const { id, title, dates } = props

  return (
    <div>
      <h3>{title}</h3>
      {dates.map(({ start, end }, i) =>
        <div key={id + i}>
          <strong>Day</strong>
          <div>
            <div>
              <span>start</span><br />
              <span>{start}</span>
            </div>
            <div>
              <span>end</span><br />
              <span>{end}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
