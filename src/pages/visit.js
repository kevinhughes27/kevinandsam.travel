import React, { Component } from 'react'
import ReactResponsiveSelect from 'react-responsive-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { currentLocation, countries as allCountries } from '../data/route'

const countries = allCountries.filter((c) => {
   const foreignCountry = c.name !== "Ottawa" && c.name !== "Calgary"
   const futureCountry = moment(c.date) > Date.now()
   return foreignCountry && futureCountry
})

class VisitPage extends Component {
  state = {
    when: null,
    where: '',
    lastAnswer: ''
  }

  handleWhenChange = (date) => {
    const country = countries
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
      .find((r) => {
        return date.isAfter(r.date)
      })
        || countries[countries.length - 1]

    this.setState({
      when: date,
      where: country.name,
      lastAnswer: 'when'
    })
  }

  handleWhereChange = (option) => {
    const countryName = option.value

    if (countryName === '') { return }

    const country = countries.find((r) => {
      return r.name === countryName
    })

    const when = moment(country.date)

    this.setState({
      when: when,
      where: countryName,
      lastAnswer: 'where'
    })
  }

  renderResponse() {
    const { when, where, lastAnswer } = this.state

    if (when === null) {
      return
    }

    const country = countries.find((r) => { return r.name === where })

    const month = when.format("MMMM")
    const monthDay = when.format("MMMM D")

    const baseUrl = 'https://www.google.ca/flights/'
    const airport = country.airport
    const startDate = when.format('YYYY-MM-DD')
    const endDate = moment(startDate).add(15, 'days').format('YYYY-MM-DD')
    const flightUrl = baseUrl + `#search;t=${airport};d=${startDate};r=${endDate}`
    const flightLink = <a href={flightUrl} target="_blank">book your flights!</a>

    const subject = lastAnswer === 'when'
      ? `Coming to visit in ${month}`
      : `Coming to visit in ${where}`
    const contactHref = `mailto:kevinhughes27@gmail.com?subject=${subject}`
    const contactLink = <a href={contactHref}>let us know</a>

    const response = lastAnswer === 'when'
      ? <p>In {month} we're planning to be in {where}. Now just {contactLink} and {flightLink}</p>
      : <p>We're planning to be in {where} around {month}. Now just {contactLink} and {flightLink}</p>

    return <div className='response'>{response}</div>
  }

  renderClosing() {
    const contactLink = <a href='mailto:kevinhughes27@gmail.com'>Tell us!</a>

    return (
      <p className='closing'>
        Have somewhere else in mind or a suggestion? {contactLink}
      </p>
    )
  }

  render () {
    const { when, where } = this.state

    let whereOptions = countries
      .sort((a, b) => {
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0
      })
      .map((r) => {
        return { value: r.name, text: r.name }
      })

    // add empty initial option
    if (when === null) {
      whereOptions.push({value: '', text: 'Select'})
    }

    const greeting = "We'd be thrilled to have visitors at any time during our travels. All you need to do is choose:"

    return (
      <section id="visit" className="section-padding">
        <div className="grid">
          <div className="text-container">

            <p>{greeting}</p>

            <div className="question-container">
              <div className="question">
                <p>When</p>
                <DatePicker
                  selected={when}
                  minDate={moment()}
                  customInput={<DatePickerButton />}
                  withPortal
                  onChange={this.handleWhenChange}
                />
              </div>

              <p>or</p>

              <div className="question">
                <p>Where</p>
                <ReactResponsiveSelect
                  caretIcon={caretIcon}
                  name="where"
                  options={whereOptions}
                  selectedValue={where}
                  onChange={this.handleWhereChange}
                />
              </div>
            </div>

            { this.renderResponse() }
            { this.renderClosing() }
          </div>
        </div>
      </section>
    )
  }
}

class DatePickerButton extends Component {
  render() {
    return (
      <button
        className="datepicker-button"
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}

const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
)

export default VisitPage
