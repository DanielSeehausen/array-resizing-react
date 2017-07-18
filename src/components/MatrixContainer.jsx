import React, { Component } from 'react'
import ArrayInterface from './ArrayInterface'
import Matrix from './Matrix'
import Row from './Row'
import Cell from './Cell'
import screenShake from '../helpers/screenShake'
import playAudio from '../helpers/audioPlayer'

let defMatrix = [
  [0, 0, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1]
]

let longestContiguousArrSize = () => {
  let longestFound = -1
  for (let row = 0; row < defMatrix.length; row++) {
    let currLength = 0
    for (let col = 0; col < defMatrix[0].length; col++) {
      currLength = (defMatrix[row][col] === 0) ? currLength+1 : 0
      currLength > longestFound && (longestFound = currLength)
    }
  }
  return longestFound
}

class MatrixContainer extends Component {
  constructor() {
    super()
    this.state = {
      mat: defMatrix.map(arr => arr.slice()),
      currLength: 0,
      currStartPos: 0,
    }
    this.maxArrSize = longestContiguousArrSize()
  }

  shakeScreen = () => { screenShake(this.container) }

  resetMatrix = () => {
    this.setState({
      mat: defMatrix.map(arr => arr.slice()),
      currLength: 0,
      currStartPos: 0
    })
  }

  getValidArr = (str) => {
    let arr = str.split(/\s+/)
    if (arr[arr.length-1] === '')
      arr.pop()
    return (arr.length === 0) ? false : arr
  }

  getStartPos = (arrLength) => {
    let remaining = arrLength
    for (let row = 0; row < this.state.mat.length; row++) {
      for (let col = 0; col < this.state.mat[0].length; col++) {
        remaining = (this.state.mat[row][col] === 1) ? arrLength : --remaining
        if (remaining === 0) return [row, col - arrLength + 1]
      }
    }
    return false
  }

  moveElement = (mat, pos, val, delay, shouldShake) => {
    if (shouldShake) {
      setTimeout(() => {
        mat[pos[0]][pos[1]] = val
        playAudio()
        this.shakeScreen()
        this.setState({mat})
      }, delay * 250)
    } else {
      mat[pos[0]][pos[1]] = val
      this.setState({mat})
    }
  }

  setMatrix = (arr, startPos, shakeAfter) => {
    let mat = defMatrix.map(arr => arr.slice())
    for (let col = startPos[1], count = 0; col < arr.length+startPos[1]; col++, count++) {
      let shouldShake = count > shakeAfter
      console.log(count, shakeAfter, shouldShake)
      let delay = shouldShake ? count - shakeAfter - 1 : null
      this.moveElement(mat, [startPos[0], col], arr[col - startPos[1]], delay, shouldShake)
    }
  }

  coordSame = (posA, posB) => {
    return (posA[0] === posB[0] && posA[1] === posB[1]) ? true : false
  }

  // fix this please
  updateMatrix = (arr) => {
    let startPos = this.getStartPos(arr.length)
    let difference = arr.length - this.state.currLength
    var shakeAfter = Number.POSITIVE_INFINITY
    if (!this.coordSame(startPos, this.state.currStartPos)) {
      shakeAfter = -1
    } else if (difference > 0) {
      shakeAfter = arr.length - difference
    }
    this.setState({
      currLength: arr.length,
      currStartPos: startPos
    })
    this.setMatrix(arr, startPos, shakeAfter)
  }

  handleChange = (e) => {
    let arr = this.getValidArr(e.target.value)
    this.setState({currLength: arr.length})
    if (arr.length > this.maxArrSize) {
      return
    } else if (arr) {
      this.updateMatrix(arr)
    } else {
      this.resetMatrix()
    }
  }

  render() {
    return (
      <div>
        {(this.state.currLength > this.maxArrSize ) ? <div style={{color: '#FF0000', width: '100%', margin: '0 auto', position: 'absolute', top: '7%'}}>Array Too Large!</div> : null}
        <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
          <ArrayInterface handleChange={this.handleChange}/>
        </div>
        <div ref={(container) => this.container = container} style={{height: '80%', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
          <Matrix mat={this.state.mat} />
        </div>
      </div>
    )
  }
}

export default MatrixContainer
