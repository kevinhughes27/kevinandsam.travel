import React, { Component } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { currentLocation, route } from '../data/route'


class VisitPage extends Component {
  state = {
    when: null,
    where: '',
  }

  handleWhenChange = (date) => {
    const location = route.reverse().find((r) => {
      return date.isAfter(r.date)
    })

    this.setState({
      when: date,
      where: location.name
    })
  }

  handleWhereChange = (option) => {
    const locationName = option.value
    const location = route.find((r) => {
      return r.name === locationName
    })

    const when = moment(location.date)

    this.setState({
      when: when,
      where: locationName
    })
  }

  render () {
    const { when, where } = this.state
    const whereOptions = route.map((r) => {
      return { value: r.name, label: r.name }
    })

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
                  minDate={moment('2018-02-01')}
                  onChange={this.handleWhenChange}
                />
              </div>

              or

              <div className="question">
                Where
                <Select
                  value={where}
                  options={whereOptions}
                  clearable={false}
                  searchPromptText={''}
                  onChange={this.handleWhereChange}
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
