import React, { Component } from 'react';

import Ship from './Ship';

export class Ships extends Component {
  state = {
    lengths: [
      [0,0,0,0,0],
      [0,0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0]
    ],
    direction: 'horizontal'
  };

  rotateShips = () => {
    let direction = (this.state.direction === 'horizontal') ? 'vertical' : 'horizontal';

    this.setState({ direction });
  }

  render() {
    return (
      <>
        <div className={'ships ' + this.state.direction}>
          {this.state.lengths.map((length, id) => (
          <div className={"ship " + this.state.direction} key={'class' + id}>
            <Ship key={id} length={length} />
          </div>
        ))}
        </div>
        <div className="buttons">
          <button onClick={this.rotateShips}>Rotate</button>
        </div>
      </>
    )

  }
}

export default Ships
