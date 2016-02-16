import React, { PropTypes } from 'react'

const fixedStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflowY: 'scroll',
  opacity: 0,
  transition: 'opacity 0.2s',
}

const containerStyle = {
  left: 0,
  minHeight: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 400,
  display: 'table',
  height: '100% !important',
  tableLayout: 'fixed',
  width: '100%',
}

const overlayStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
}

const contentStyle = {
  display: 'table-cell',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: '100%',
}

const contentInner = {
  textAlign: 'left',
}


class ModalContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen }
    this.onClickOverlay = this.onClickOverlay.bind(this)
    this.firstMounted = true
  }

  componentDidMount() {
    if (this.state.isOpen) {
      this.applyOpenStyle()
    } else {
      this.deApplyStyle()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen) {
      this.applyOpenStyle()
    } else {
      this.deApplyStyle()
    }
  }

  onClickOverlay(e) {
    if (this.props.onClickOverlay) {
      return this.props.onClickOverlay(e, this)
    }
    this.dismissModal()
  }

  presentModal() {
    this.setState({ isOpen: true })
  }

  dismissModal() {
    const modal = document.getElementsByClassName('js-modal')[0]
    modal.style.opacity = 0
    setTimeout(() => {
      this.setState({ isOpen: false })
    }, 200)
  }

  applyOpenStyle() {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    const body = document.querySelector('body')
    const overlay = document.getElementsByClassName('js-modal')[0]
    body.style.position = 'fixed'
    body.style.width = '100%'
    body.style.height = '100%'
    body.style.top = `${-top}px`
    overlay.style.opacity = 1
  }

  deApplyStyle() {
    const body = document.querySelector('body')
    const top = parseInt(body.style.top) || 0
    body.style = null
    window.scrollTo(0, Math.abs(top))
  }

  render() {
    const { isOpen } = this.state
    if (!isOpen) return <span />

    let modalStyle = Object.assign({}, fixedStyle)
    if (this.firstMounted) {
      this.firstMounted = false
      modalStyle = Object.assign({}, modalStyle, { opacity: 1 })
    }

    return (
      <div className="modal-fixed js-modal" style={modalStyle}>
        <div className="modal-container" style={containerStyle}>
          <div
            className="modal-container__overlay js-overlay"
            style={overlayStyle}
            onClick={this.onClickOverlay} />

            <div className="modal-container__content" style={contentStyle}>
              <div className="modal-container__conntent-inner" style={contentInner}>
                { this.props.children }
              </div>
            </div>
          </div>
      </div>
    )
  }
}

ModalContainer.defaultProps = {
  isOpen: false,
}

ModalContainer.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onClickOverlay: PropTypes.func,
}

export default ModalContainer
