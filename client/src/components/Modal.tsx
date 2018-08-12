import React, { PureComponent } from 'react'

interface P {
  onClick: (args: any) => any
}

export default class Modal extends PureComponent<P> {
  
  render() {
    return (
      <div className="modal">
        <div className="modal__click-catcher" onClick={this.props.onClick}/>
        {
          this.props.children
        }
      </div>
    )
  }
}
