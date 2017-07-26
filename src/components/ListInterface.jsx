import React, { Component } from 'react'
import UserInput from './UserInput'
import VisualMatrix from './matrix/VisualMatrix'
import screenShake from '../helpers/screenShake'
import playAudio from '../helpers/audioPlayer.js'
import LLMatrix from '../helpers/LLMatrix.js'

// TODO the linked list needs to update the actual matrix when a new element is successfully added

class ListInterface extends Component {
  constructor() {
    super()
    this.matrix = new LLMatrix()
    this.state = {
      matVals: this.matrix.matVals,
      currArr: []
    }
    this.maxArrLength = this.matrix.availablePositions
  }

  shakeScreen = () => { screenShake(this.container) }

  resetInterface = () => {
    this.matrix.resetToDefault()
    this.setState({
      matVals: this.matrix.matVals
    })
    playAudio()
  }

  getValidArr = (str) => (str.replace(/[ ,/]/g, '').split(''))

  writeElement = (val) => {
    this.matrix.addCell(val)
    playAudio()
  }

  updateMatrix = (arr) => {
    this.writeElement(arr[arr.length-1])
    this.setState({
      matVals: this.matrix.matVals,
      currArr: arr
    })
  }

  handleChange = (e) => {
    const sanitizedArr = this.getValidArr(e.target.value)
    this.updateMatrix(sanitizedArr)
  }

  render() {
    return (
      <div>
        <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
          <UserInput handleChange={this.handleChange} val={this.state.currArr.join(', ')} locked={false} />
        </div>
        <div ref={(container) => this.container = container} style={{height: '80%', minWidth: '600px', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
          <VisualMatrix matVals={this.matrix.matVals} parentStruc={'List'}/>
        </div>
      </div>
    )
  }
}

export default ListInterface
