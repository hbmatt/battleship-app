import React, { Component } from 'react'

import Column from './Column'

export class Board extends Component {
  render() {
    return this.props.player.board.grid.map((col, id) => (
      <div key={'column' + id} className="column">
        <Column key={'col' + id} col={col} />
      </div>
    ))
  }
}

export default Board
