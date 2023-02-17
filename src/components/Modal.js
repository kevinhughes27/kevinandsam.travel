import React from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

ReactModal.setAppElement(`#___gatsby`)

class Modal extends React.Component {
  render () {
    const { isOpen, close, children } = this.props

    // scroll down 1 to hide url bar for true fullscreen on mobile
    if (isOpen) {
      if (window.scrollY === 0) {
        window.scrollTo( 0, 1 );
      }
    }

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={close}
        contentLabel='Modal'
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        <div className='modal-target' onClick={close}>
          <div className='modal-body'>
            {children}
          </div>
          <FontAwesomeIcon icon={faTimes} className='modal-close'
            onClick={close}
          />
        </div>
      </ReactModal>
    )
  }
}

export default Modal
