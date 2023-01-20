import React, { Component } from 'react'
import Layout from '../components/Layout'
import DatePicker from 'react-datepicker'
import { Select } from 'react-responsive-select'
import { add, isAfter, format } from 'date-fns'
import { countries } from '../data/countries'
export { Head } from '../components/Head'

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
        return isAfter(date, new Date(r.date))
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

    const when = new Date(country.date)

    this.setState({
      when: when,
      where: countryName,
      lastAnswer: 'where'
    })
  }

  renderGreeting() {
    return(
      <div>
        <p>
          Our nomading days are behind us now but you're welcome to come visit in Ottawa!
        </p>
        <p>
          This form isn't useful anymore but I think it's neat so I've left it up in an archived fashion so you can see how it used to work.
        </p>
        <p>
          All you need to do is choose:
        </p>
      </div>
    )
  }

  renderResponse() {
    const { when, where, lastAnswer } = this.state

    if (when === null) {
      return
    }

    const country = countries.find((r) => { return r.name === where })

    const month = format(when, "MMMM")

    const baseUrl = 'https://www.google.ca/flights/'
    const airport = country.airport
    const startDate = format(when, 'yyyy-MM-dd')
    const endDate = format(add(when, {days: 15}), 'yyyy-MM-dd')
    const flightUrl = baseUrl + `#search;t=${airport};d=${startDate};r=${endDate}`
    const flightLink = <a href={flightUrl} target="_blank" rel="noreferrer">book your flights!</a>

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
    const minDate = new Date("2018-02-01")
    const maxDate = new Date ("2019-03-20")

    let whereOptions = countries
      .sort((a, b) => {
        return (a.name[0] < b.name[0]) ? -1 : (a.name[0] > b.name[0]) ? 1 : 0
      })
      .map((r) => {
        return { value: r.name, text: r.name }
      })

    return (
      <Layout>
        <section id="visit" className="section-padding">
          <div className="grid">
            <div className="text-container">

              { this.renderGreeting() }

              <div className="question-container">
                <div className="question">
                  <p>When</p>
                  <DatePicker
                    selected={when}
                    minDate={minDate}
                    maxDate={maxDate}
                    customInput={<DatePickerButton />}
                    onChange={this.handleWhenChange}
                    withPortal
                  />
                </div>

                <p>or</p>

                <div className="question">
                  <p>Where</p>
                  <Select
                    caretIcon={caretIcon}
                    noSelectionLabel="Select"
                    name="where"
                    options={whereOptions}
                    selectedValue={where}
                    key={where}
                    onChange={this.handleWhereChange}
                  />
                </div>
              </div>

              { this.renderResponse() }
              { this.renderClosing() }
            </div>
          </div>
        </section>
      </Layout>
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
