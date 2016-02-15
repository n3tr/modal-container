import React, { PropTypes } from 'react'

const fixedStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflowY: 'scroll'
}

const containerStyle = {
  height: 'auto',
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
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
}

const contentStyle = {
  display: 'table-cell',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: '100%'
}

const contentInner = {
  // position: 'relative',
  textAlign: 'left',
}


class ModalContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen }
    this.onClickOverlay = this.onClickOverlay.bind(this)
  }

  componentDidMount() {
    if (this.state.isOpen) {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let body = document.querySelector('body');
      body.style['position'] = 'fixed'
      body.style['width'] = '100%'
      body.style['height'] = '100%'
      body.style['top'] = `${-top}px`
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen) {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
      let body = document.querySelector('body');
      body.style['position'] = 'fixed'
      body.style['width'] = '100%'
      body.style['height'] = '100%'
      body.style['top'] = `${-top}px`
    }else{
      let body = document.querySelector('body');
      let top = parseInt(body.style['top']) || 0
      body.style = null
      window.scrollTo(0, Math.abs(top));
    }
  }


  onClickOverlay(e) {
    if (this.props.onClickOverlay) {
      return this.props.onClickOverlay(this)
    }

    this.dismissModal()
  }

  presentModal() {
    // TODO: Apply kind of animation before set state
    this.setState({ isOpen: true })
  }

  dismissModal() {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state
    if (!isOpen) return <span />

    return (
      <div className="modal-fixed" style={fixedStyle}>
        <div className="modal-container" style={containerStyle}>
          <div
            className="modal-container__overlay"
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
