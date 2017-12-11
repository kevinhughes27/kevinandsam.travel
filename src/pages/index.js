import React from 'react'
import Countdown from 'react-cntdwn'

const IndexPage = () => (
  <div id="countdown">
    <Countdown
      targetDate={new Date('9:10 AM Feb 1, 2018')}
      format={{
        day: 'dd days',
        hour: 'hh hours',
        minute: 'mm minutes',
        second: 'and ss seconds until departure 🚀'
      }}
      timeSeparator={' '}
    />
  </div>
)

export default IndexPage
