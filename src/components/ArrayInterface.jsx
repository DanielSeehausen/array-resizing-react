import React, { Component } from 'react'
import UserInput from './UserInput'
import VisualMatrix from './VisualMatrix'
import screenShake from '../helpers/screenShake'
import playAudio from '../helpers/audioPlayer.js'
import Matrix from '../helpers/Matrix.js'

//TODO use lock to prevent users from adding when they shouldn't

class ArrayInterface extends Component {
  constructor() {
    super()
    this.matrix = new Matrix()
    this.state = {
      matVals: this.matrix.matVals,
      currArr: [],
      currStartPos: [0, 0],
    }
    this.maxArrLength = this.matrix.longestContiguousFreeSpace()
  }

  shakeScreen = () => { screenShake(this.container) }

  resetInterface = () => {
    this.matrix.resetToDefault()
    this.setState({
      matVals: this.matrix.matVals,
      currArr: [],
      currStartPos: [0, 0]
    })
    playAudio()
  }

  getValidArr = (str) => {
    return str.replace(/ /g, '').split('')
  }

  expensiveWrite = (pos, val, iterCount, shouldShake) => {
    setTimeout(() => {
      this.matrix.setValue(pos, val)
      playAudio()
      this.shakeScreen()
      this.setState({ matVals: this.matrix.matVals })
    }, iterCount * 200)
  }

  normalWrite = (pos, val, iterCount, shouldShake) => {
    this.matrix.setValue(pos, val)
    playAudio()
    this.setState({ matVals: this.matrix.matVals })
  }

  writeElement = (pos, val, iterCount, shouldShake) => {
    const writeType = (shouldShake) ? this.expensiveWrite : this.normalWrite
    writeType(pos, val, iterCount, shouldShake)
  }

  writeMatrix = (userArr, startPos, shakeAfter) => {
    this.matrix.resetToDefault()
    for (let col = startPos[1], idx = 0; col < userArr.length+startPos[1]; col++, idx++) {
      let shouldShake = idx > shakeAfter
      this.writeElement([startPos[0], col], userArr[idx], idx, shouldShake)
    }
  }

  coordSame = (posA, posB) => {
    return (posA[0] === posB[0] && posA[1] === posB[1]) ? true : false
  }

  arrEquals = (arrA, arrB) => {
    if (arrA.length !== arrB.length) return false
    for (let i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i])
        return false
    }
    return true
  }

  // Implement a lock!
  updateMatrix = (arr) => {
    if (arr.length === 0) {
      if (this.state.currStartPos !== 0)
        this.resetInterface()
      return
    }
    const difference = arr.length - this.state.currArr.length
    console.log(this.state.currStartPos, arr.length)
    const startPos = this.matrix.getStartPos(arr.length, this.state.currStartPos)
    console.log(startPos)
    const shakeAfter = this.coordSame(startPos, this.state.currStartPos) ? (arr.length - difference) : -1
    // instead of reverting to default could keep track of what was written and erase it only instead
    this.writeMatrix(arr, startPos, shakeAfter)
    this.setState({
      currLength: arr.length,
      currStartPos: startPos,
      currArr: arr
    })
  }

  updateRequired = (arr) => (arr.length <= this.maxArrLength && !this.arrEquals(arr, this.state.currArr))

  handleChange = (e) => {
    const sanitizedArr = this.getValidArr(e.target.value)
    if (this.updateRequired(sanitizedArr))
      this.updateMatrix(sanitizedArr)
  }

  render() {
    return (
      <div>
        {(this.state.currLength > this.maxArrSize ) ? <div style={{color: '#FF0000', width: '100%', margin: '0 auto', position: 'absolute', top: '7%'}}>Array Too Large!</div> : null}
        <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
          <UserInput handleChange={this.handleChange} val={this.state.currArr.join(' ')}/>
        </div>
        <div ref={(container) => this.container = container} style={{height: '80%', minWidth: '600px', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
          <VisualMatrix matVals={this.matrix.matVals} parentStruc={'Array'}/>
        </div>
      </div>
    )
  }
}

export default ArrayInterface
