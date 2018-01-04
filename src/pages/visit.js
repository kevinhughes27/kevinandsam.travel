import React, { Component } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { currentLocation, route } from '../data/route'

class VisitPage extends Component {
  state = {
    when: null,
    where: '',
  }

  handleWhenChange = (date) => {
    this.setState({when: date})
  }


  handleWhereChange = (location) => {
    this.setState({where: location})
  }

  render () {
    const { when, where } = this.state
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]

    return (
      <section id="visit" className="section-padding">
        <div className="grid">
          <div className="text-container">
            <p>
              We'd be thrilled to have visitors at any time during our travels. All you need to do is pick:
            </p>

            <div className="question-container">
              <div className="question">
                When
                <DatePicker
                  selected={when}
                  onChange={this.handleWhenChange}
                />
              </div>

              or

              <div className="question">
                Where
                <Select
                  value={where}
                  onChange={this.handleWhereChange}
                  options={options}
                  clearable={false}
                  searchPromptText={''}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default VisitPage
