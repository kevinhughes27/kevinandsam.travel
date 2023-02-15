import React from 'react'

class Quote extends React.Component {
  render () {
    return (
      <p className='quote'>
        { this.props.children }
      </p>
    )
  }
}

export default Quote
