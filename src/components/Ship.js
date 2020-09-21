import React, { Component } from 'react'

export class Ship extends Component {
  render() {
    return this.props.length.map((cell,id) => (
      <div key={id} className="block"></div>
    ))
  }
}

export default Ship
