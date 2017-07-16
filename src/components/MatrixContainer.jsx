import React, { Component } from 'react'
import ArrayInterface from './ArrayInterface'
import Matrix from './Matrix'
import Row from './Row'
import Cell from './Cell'

let defMatrix = [
  ['tester', 0, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1]
]

class MatrixContainer extends Component {
  constructor() {
    super()
    this.state = {
      mat: defMatrix,
      arr: [1, 2, 3]
    }
  }

  userArrToString = () => {
    return this.state.arr.join(', ')
  }

  handleChange = () => {

    this.setState({

    })
  }


  render() {
    return (
      <div>
        <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
          <ArrayInterface arr={this.userArrToString()} handleChange={this.handleChange}/>
        </div>
        <div style={{height: '80%', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
          <Matrix mat={this.state.mat} />
        </div>
      </div>
    )
  }
}

export default MatrixContainer
