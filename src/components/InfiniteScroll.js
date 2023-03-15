import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'

export default function InfinitScroll(WrappedComponent, options) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      const uid = options.uid
      this.storageKey = `${uid}-show`
      this.scrollKey = `${uid}-scroll`
      this.threshold = options.threshold
      this.loadSize = options.loadSize

      let show = options.initialSize
      let ready = true

      if (typeof window !== `undefined`) {
        show = window[this.storageKey] || options.initialSize
        ready = window[this.scrollKey] === undefined
      }

      this.state = {
        ready, show
      }
    }

    reset() {
      this.setState({show: this.loadSize, ready: false})
      window.scrollTo(0, 0)
      delete window[this.scrollKey]
      this.setState({ready: true})
    }

    update() {
      const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight)

      if (distanceToBottom < this.threshold) {
        const show = this.state.show + this.loadSize

        window[this.storageKey] = show
        this.setState({ show })
      }

      this.ticking = false
    }

    initScroll = () => {
      if (window[this.scrollKey] !== undefined) {
        this.restoreScroll()
      } else {
        this.setState({ready: true})
      }
    }

    restoreScroll = () => {
      setTimeout(() => {
        window.scrollTo(0, window[this.scrollKey])
        this.setState({ready: true})
      }, 0)
    }

    saveScroll = () => {
      window[this.scrollKey] = window.scrollY
    }

    handleScroll = () => {
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => this.update())
      }
    }

    componentDidMount() {
      this.initScroll()
      window.addEventListener(`scroll`, this.handleScroll)
    }

    componentWillUnmount() {
      this.saveScroll()
      window.removeEventListener(`scroll`, this.handleScroll)
    }

    renderLoader() {
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

    render() {
      const { ready, show } = this.state
      // this calc isn't correct anymore with search
      // I guess the loader needs to be shown by the sub index
      // component? doesn't feel quite right either
      const max = Object.values(this.props.data)[0].nodes.length
      const showLoader = show < max

      return (
        <>
          <WrappedComponent ready={ready} show={show} resetInfiniteScroll={() => this.reset} {...this.props} />
          { showLoader ? this.renderLoader() : null }
        </>
      )
    }
  }
}
