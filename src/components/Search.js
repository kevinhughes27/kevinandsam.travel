import React from 'react'
import { Range } from 'react-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import { format } from 'date-fns'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const toggleDropdown = () => {
      this.setState({open: !this.state.open})
    }

    return (
      <div className="search">
        <button className="search-btn" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {this.state.open && (
          <div className="search-dropdown">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={this.props.search}
              onChange={(ev) => this.props.searchChange({search: ev.target.value})}
            />

            <div className="date-range-slider">
              <Range
                step={1}
                min={this.props.start}
                max={this.props.end}
                values={this.props.range}
                onChange={(values) => this.props.searchChange({ range: values })}
                renderTrack={({ props, children }) => (
                  <div {...props} style={{ ...props.style }} className="track">
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div {...props} style={{ ...props.style }} className="thumb" >
                    <div className="thumb-label">
                      {format(new Date(this.props.range[index]*1000), "MM/yy")}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="asc-desc-toggle">
              <label>
                <input type="radio" value="asc" onChange={() => this.props.searchChange({order: "asc"})} checked={this.props.order == "asc"} /> Asc
              </label>
              <span> / </span>
              <label>
                <input type="radio" value="desc" onChange={() => this.props.searchChange({order: "desc"})} checked={this.props.order == "desc"} /> Desc
              </label>
            </div>

            <button
              className="search-close"
              onClick={() => this.setState({open: false})}>
              Close
            </button>
          </div>
        )}
      </div>
    )
  }
}
