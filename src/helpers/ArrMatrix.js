const defaultMatrix = [
  [null, null, 1, 1, null, null, null, 1, 1, 1, 1, 1, null, null, null],
  [1, 1, 1, 1, null, 1, 1, null, null, null, null, 1, null, null, null],
  [1, null, null, null, null, null, 1, 1, null, 1, null, 1, 1, 1, 1],
  [1, 1, null, 1, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
  [null, null, null, null, null, null, null, null, 1, 1, null, null, null, 1, 1],
  [1, null, null, null, null, null, null, null, null, null, null, null, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, null, null, null, 1, null, 1, 1],
  [null, 1, null, null, null, null, null, null, null, null, null, null, null, null, 1],
]

export default class ArrMatrix {

  constructor(matVals=defaultMatrix, emptyVal=null) {
    this.matVals = matVals.map(arr => arr.slice())
    this.height = matVals.length
    this.width = matVals[0].length
    this.emptyVal = emptyVal
    this.fullVal = 1
  }

  resetToDefault() {
    this.matVals = defaultMatrix.map(arr => arr.slice())
    this.prevStartPos = [0, 0]
  }

  setValue(pos, val) {
    this.matVals[pos[0]][pos[1]] = val
  }

  getValue(pos) {
    return this.matVals[pos[0]][pos[1]]
  }

  posIsAvailable(pos) {
    return (defaultMatrix[pos[0]][pos[1]] !== this.fullVal) ? true : false
  }

  coordSame(posA, posB) {
    return (posA[0] === posB[0] && posA[1] === posB[1]) ? true : false
  }


  getNextEmptyCellFrom(startingPos) {
    for (let row = startingPos[0]; row < this.height; row++) {
      for (let col = startingPos[1]; col < this.width; col++) {
        if (this.posIsAvailable([row, col])) return [row, col]
      }
    }
  }

  getStartPos(arrLength, startPos) {
    // this needs to check from the starting col once, then from 0 on each new row
    let remaining = arrLength
    for (let row = startPos[0]; row < this.height; row++) {
      remaining = arrLength
      for (let col = startPos[1]; col < this.width; col++) {
        console.log([row, col], this.posIsAvailable([row, col]))
        remaining = (this.posIsAvailable([row, col])) ? --remaining : arrLength
        if (remaining === 0) return [row, col - arrLength + 1]
      }
      startPos[1] = 0
    }
    return false
  }

  longestContiguousFreeSpace() {
    // IN A SINGLE ROW!
    let longestFound = -1
    for (let row = 0; row < this.height; row++) {
      let currLength = 0
      for (let col = 0; col < this.width; col++) {
        currLength = (this.posIsAvailable([row, col])) ? ++currLength : 0
        currLength > longestFound && (longestFound = currLength) // sloppy DOP!
      }
    }
    return longestFound
  }
}
