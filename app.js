import React from 'react'
import ModalContainer from 'modal-container'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentHeight: 500
    }
    this.modal = null
    this.openModal = this.openModal.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  openModal() {
    this.modal.presentModal()
  }

  dismiss() {
    this.modal.dismissModal()
  }


  render() {
    return (
      <div>
        <ModalContainer ref={(modal) => this.modal = modal}>
          <div style={
              {
                position: 'relative',
                width: '500px',
                height: this.state.contentHeight,
                margin: '20px auto',
                backgroundColor: '#fff'
              }
            }>
            <p>Modal</p>
            <div>
              <button onClick={this.dismiss}>Close Modal</button>
              <button onClick={() => {
                  let confirm = window.confirm("Close?")
                  if (confirm) this.dismiss()
                }}>Close with confirm</button>
            </div>
            <div>
              <button onClick={()=> this.setState({
                  contentHeight: this.state.contentHeight + 200
                })}>Add Content Height</button>

            </div>

          </div>
        </ModalContainer>


        <div>
          <h1 style={{margin:"0 0 20px"}}>
            Modal Container Demo
          </h1>
          <button onClick={this.openModal}>Open Modal</button>
          <div style={{ height: 1000, display: 'block', backgroundColor: '#efefef' }}>
            <span>Scroll down...</span>
          </div>
          <button onClick={this.openModal}>Open Modal with retain position</button>
        </div>

      </div>
    )
  }
}

export default App
