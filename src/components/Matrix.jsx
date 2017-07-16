import React, { Component } from 'react'
import Row from './Row'
import Cell from './Cell'


class Matrix extends Component {
  constructor() {
    super()
  }

  playSound = () => {
    // play this.props.sound
  }

  render() {
    this.playSound()

    return (
      <table style={{width: '90%', height: '80%', margin: '0 auto'}}>
        {this.props.mat.map(row => <Row vals={row} />)}
      </table>
    )
  }
}

export default Matrix
