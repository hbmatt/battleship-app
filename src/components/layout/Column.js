import React, { Component } from 'react'

export class Column extends Component {
  getClass = (cell) => {
    switch(cell) {
      case 0:
        return 'cell'
      case 'X':
        return 'cell hit'
      case 'O':
        return 'cell miss'
      default:
        return 'cell ship'
    }
  }

  render() {
    return this.props.col.reverse().map((cell, id) => (
      <div key={'cell' + id} className={this.getClass(cell)}></div>
    ));
  }
}

export default Column
