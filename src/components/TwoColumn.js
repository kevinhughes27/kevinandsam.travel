import React from 'react'

class TwoColumn extends React.Component {
  render () {
    const children = this.props.children.filter((c) => typeof(c) !== "string")

    if (children.length !== 2) {
      throw(Error("TwoColumn requires 2 children"))
    }

    return (
      <div className='two-column'>
        <div className='column'>{children[0]}</div>
        <div className='column'>{children[1]}</div>
      </div>
    )
  }
}

export default TwoColumn
