import React from 'react'
import ModalContainer from 'npm-template'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.modal = null
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.modal.presentModal()
  }

  render() {
    return (
      <div>
        <ModalContainer ref={(modal) => this.modal = modal}>
          <div style={
              {
                position: 'relative',
                width: '500px',
                height: '2100px',
                margin: '20px auto',
                backgroundColor: '#fff'
              }
            }>
            <p>Modal</p>
          </div>
        </ModalContainer>
        <h1>App</h1>
        <div style={{ height: 1000, display: 'block', backgroundColor: '#efefef' }} />
        <button onClick={this.openModal}>Open Modal</button>
      </div>
    )
  }
}

export default App
