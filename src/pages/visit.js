import React, { Component } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { currentLocation, route } from '../data/route'


class VisitPage extends Component {
  state = {
    when: null,
    where: '',
    lastAnswer: null
  }

  handleWhenChange = (date) => {
    const location = route.reverse().find((r) => {
      return date.isAfter(r.date)
    })

    this.setState({
      when: date,
      where: location.name,
      lastAnswer: 'when'
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
      where: locationName,
      lastAnswer: 'where'
    })
  }

  renderResponse() {
    const { when, where, lastAnswer } = this.state

    if (when === null) {
      return
    }

    const location = route.find((r) => { return r.name === where })

    const month = when.format("MMMM")
    const monthDay = when.format("MMMM D")

    const baseUrl = 'https://www.google.ca/flights/'
    const locationAirport = location.airport
    const startDate = when.format('YYYY-MM-DD')
    const endDate = when.add(15, 'days').format('YYYY-MM-DD')
    const flightUrl = baseUrl + `#search;t=${locationAirport};d=${startDate};r=${endDate}`
    const flightLink = <a href={flightUrl} target="_blank">book your flights!</a>

    const subject = lastAnswer === 'when'
      ? `Coming to visit in ${month}`
      : `Coming to visit in ${where}`
    const contactHref = `mailto:kevinhughes27@gmail.com?subject=${subject}`
    const contactLink = <a href={contactHref}>Let us know</a>

    const response = lastAnswer === 'when'
      ? <p>In {month} we're planning to be in {where}. Now just {contactLink} and {flightLink}</p>
      : <p>We're planning to be in {where} around {month}. Now just {contactLink} and {flightLink}</p>

    return response
  }

  render () {
    const { when, where } = this.state
    const whereOptions = route.filter((r) => r.form !== false).map((r) => {
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
                  disabledKeyboardNavigation
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

            { this.renderResponse() }
          </div>
        </div>
      </section>
    )
  }
}

export default VisitPage
