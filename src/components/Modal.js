import React from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

ReactModal.setAppElement(`#___gatsby`)

class Modal extends React.Component {
  render () {
    const { isOpen, close, children } = this.props

    if (isOpen) {
      if (window.innerWidth < 600 && !document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      }
    }

    const onClose = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      close()
    }

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel='Modal'
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        <div className='modal-target' onClick={close}>
          <div className='modal-body'>
            {children}
          </div>
          <FontAwesomeIcon icon={faTimes} className='modal-close'
            onClick={onClose}
          />
        </div>
      </ReactModal>
    )
  }
}

export default Modal
