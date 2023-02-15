import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

ReactModal.setAppElement(`#___gatsby`)

class Modal extends Component {
  render () {
    const { isOpen, close, children } = this.props

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
