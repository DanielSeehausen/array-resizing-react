import React, { Component } from 'react'
import UserInput from './UserInput'
import VisualMatrix from './matrix/VisualMatrix'
import screenShake from '../helpers/screenShake'
import playAudio from '../helpers/audioPlayer.js'
import ArrMatrix from '../helpers/ArrMatrix.js'

class ArrayInterface extends Component {
  constructor() {
    super()
    this.matrix = new ArrMatrix()
    this.state = {
      matVals: this.matrix.matVals,
      currArr: [],
      currStartPos: [0, 0],
      locked: false,
    }
    this.maxArrLength = this.matrix.longestContiguousFreeSpace()
  }

  shakeScreen = () => { screenShake(this.container) }

  resetInterface = () => {
    this.matrix.resetToDefault()
    this.setState({
      matVals: this.matrix.matVals,
      currArr: [],
      currStartPos: [0, 0],
      locked: false
    })
    playAudio()
  }

  getValidArr = (str) => (str.replace(/[ ,/]/g, '').split(''))

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

  unlockAfter = (totalShakes) => { // hate using setTimeout for this -- better if I had a callback and reworked expensiveWrite.
    setTimeout(() => {
      this.setState({ locked: false })
    }, totalShakes * 200)
  }

  writeMatrix = (userArr, startPos, shakeAfter) => {
    let maxShakes = 0
    this.matrix.resetToDefault() // this could be done much more efficiently
    for (let col = startPos[1], idx = 0; col < userArr.length+startPos[1]; col++, idx++) {
      let shouldShake = (idx > shakeAfter)
      if (shouldShake)
        maxShakes = idx
      this.writeElement([startPos[0], col], userArr[idx], idx, shouldShake)
    }
    this.unlockAfter(maxShakes)
  }

  arrEquals = (arrA, arrB) => {
    if (arrA.length !== arrB.length) return false
    for (let i = 0; i < arrA.length; i++) {
      if (arrA[i] !== arrB[i])
        return false
    }
    return true
  }

  updateMatrix = (arr) => {
    if (arr.length === 0) {
      if (this.state.currStartPos !== 0)
        this.resetInterface()
      return
    }
    const difference = arr.length - this.state.currArr.length
    const startPos = this.matrix.getStartPos(arr.length, this.state.currStartPos)
    const shakeAfter = this.matrix.coordSame(startPos, this.state.currStartPos) ? (arr.length - difference) : -1
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
    if (this.updateRequired(sanitizedArr)) {
      this.setState({locked: true})
      this.updateMatrix(sanitizedArr)
    }
  }

  render() {
    return (
      <div>
        <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
          <UserInput handleChange={this.handleChange} val={this.state.currArr.join(', ')} locked={this.state.locked} />
        </div>
        <div ref={(container) => this.container = container} style={{height: '80%', minWidth: '600px', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
          <VisualMatrix matVals={this.matrix.matVals} parentStruc={'Array'}/>
        </div>
      </div>
    )
  }
}

export default ArrayInterface
