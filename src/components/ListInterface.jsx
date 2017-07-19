// import React, { Component } from 'react'
// import UserInput from './UserInput'
// // import Matrix from './Matrix'
// import screenShake from '../helpers/screenShake'
// import playAudio from '../helpers/audioPlayer.js'
//
// let defMatrix = [
//   [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
//   [1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
//   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
//   [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// ]
//
// let longestContiguousArrSize = () => {
//   let longestFound = -1
//   for (let row = 0; row < defMatrix.length; row++) {
//     let currLength = 0
//     for (let col = 0; col < defMatrix[0].length; col++) {
//       currLength = (defMatrix[row][col] === 0) ? currLength+1 : 0
//       currLength > longestFound && (longestFound = currLength)
//     }
//   }
//   return longestFound
// }
//
// class ListInterface extends Component {
//   constructor() {
//     super()
//     this.state = {
//       mat: defMatrix.map(arr => arr.slice()),
//       currLength: 0, // now using currArr so don't really need this
//       currArr: [],
//       currStartPos: 0,
//     }
//     this.maxArrSize = longestContiguousArrSize()
//   }
//
//   shakeScreen = () => { screenShake(this.container) }
//
//   resetMatrix = () => {
//     this.setState({
//       mat: defMatrix.map(arr => arr.slice()),
//       currLength: 0,
//       currArr: [],
//       currStartPos: 0
//     })
//     playAudio()
//   }
//
//   getValidArr = (str) => {
//     let arr = str.replace(/ /g, '').split('')
//     if (arr[arr.length-1] === '')
//       arr.pop()
//     return (arr.length === 0) ? false : arr
//   }
//
//   getStartPos = (arrLength) => {
//     let remaining = arrLength
//     for (let row = 0; row < this.state.mat.length; row++) {
//       for (let col = 0; col < this.state.mat[0].length; col++) {
//         remaining = (this.state.mat[row][col] === 1) ? arrLength : --remaining
//         if (remaining === 0) return [row, col - arrLength + 1]
//       }
//     }
//     return false
//   }
//
//   moveElement = (mat, pos, val, delay, shouldShake) => {
//     if (shouldShake) {
//       setTimeout(() => {
//         mat[pos[0]][pos[1]] = val
//         playAudio()
//         this.shakeScreen()
//         this.setState({mat})
//       }, delay * 200)
//     } else {
//       mat[pos[0]][pos[1]] = val
//       playAudio()
//       this.setState({mat})
//     }
//   }
//
//   setMatrix = (arr, startPos, shakeAfter) => {
//     let mat = defMatrix.map(arr => arr.slice())
//     for (let col = startPos[1], count = 0; col < arr.length+startPos[1]; col++, count++) {
//       let shouldShake = count > shakeAfter
//       let delay = shouldShake ? count - shakeAfter - 1 : null
//       this.moveElement(mat, [startPos[0], col], arr[col - startPos[1]], delay, shouldShake)
//     }
//   }
//
//   coordSame = (posA, posB) => {
//     return (posA[0] === posB[0] && posA[1] === posB[1]) ? true : false
//   }
//
//   arrEquals = (arrA, arrB) => {
//     if (arrA.length !== arrB.length) return false
//     for (let i = 0; i < arrA.length; i++) {
//       if (arrA[i] !== arrB[i])
//         return false
//     }
//     return true
//   }
//
//   // fix this please
//   updateMatrix = (arr) => {
//     let startPos = (arr.length <= this.state.currLength) ? this.state.currStartPos : this.getStartPos(arr.length)
//     let difference = arr.length - this.state.currLength
//     var shakeAfter = Number.POSITIVE_INFINITY
//     if (!this.coordSame(startPos, this.state.currStartPos)) {
//       shakeAfter = -1
//     } else if (difference > 0) {
//       shakeAfter = arr.length - difference
//     }
//     this.setState({
//       currLength: arr.length,
//       currStartPos: startPos
//     })
//     this.setMatrix(arr, startPos, shakeAfter)
//   }
//
//   handleChange = (e) => {
//     let arr = this.getValidArr(e.target.value)
//     this.setState({currLength: arr.length})
//     if (arr.length > this.maxArrSize || this.arrEquals(arr, this.state.currArr)) {
//       return
//     } else if (arr) {
//       this.updateMatrix(arr)
//     } else {
//       this.resetMatrix()
//     }
//     if (!arr)
//       arr = []
//     this.setState({currArr: arr})
//   }
//
//   render() {
//     return (
//       <div>
//         {(this.state.currLength > this.maxArrSize ) ? <div style={{color: '#FF0000', width: '100%', margin: '0 auto', position: 'absolute', top: '7%'}}>Array Too Large!</div> : null}
//         <div style={{height: '15%', width: '100%', margin: '0 auto', top: '10%', position: 'absolute'}}>
//           <UserInput handleChange={this.handleChange} val={this.state.currArr.join(' ')}/>
//         </div>
//         <div ref={(container) => this.container = container} style={{height: '80%', minWidth: '600px', width: '100%', margin: '0 auto', top: '25%', position: 'absolute'}}>
//           <Matrix mat={this.state.mat} parentStruc={'List'}/>
//         </div>
//       </div>
//     )
//   }
// }
//
// export default ListInterface
