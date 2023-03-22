import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loader() {
  const style = {
    textAlign: 'center',
    paddingTop: '0.25em',
    paddingBottom: '0.5em',
    opacity: 0.5
  }

  return (
    <div className='fa-2x' style={style}>
      <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
    </div>
  )
}
