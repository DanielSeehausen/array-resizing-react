import './arrHelpers.js'
import LinkedList from './LinkedList.js'

const defaultMatrix = [
  [null, null, 1, 1, null, null, null, 1, 1, 1, 1, 1, null, null, null],
  [1, 1, 1, 1, null, 1, 1, null, null, null, null, 1, null, null, null],
  [1, null, null, null, null, null, null, 1, null, 1, null, 1, 1, 1, 1],
  [1, 1, null, 1, 1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
  [null, null, null, null, null, null, null, null, 1, 1, null, null, null, 1, 1],
  [1, null, null, null, null, null, null, null, null, null, null, null, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, null, null, null, 1, null, 1, 1],
  [null, 1, null, null, null, null, null, null, null, null, null, null, null, null, 1],
]



export default class LLMatrix {

  constructor(matVals=defaultMatrix, emptyVal=null) {
    this.matVals = matVals.map(row => row.slice())
    this.height = matVals.length
    this.width = matVals[0].length
    this.availablePositions = this.getAvailablePositions()
    console.log(this.availablePositions)
    this.list = new LinkedList()
  }

  resetToDefault() {
    this.matVals = defaultMatrix.map(row => row.map(cell => cell.slice()).slice())
    this.availablePositions = this.getAvailablePositions()
    this.list = new LinkedList()
  }

  posIsAvailable(row, col) {
    console.log(row, col)
    let val = this.matVals[row][col]
    console.log(val)
    return (val === null) ? true : false
  }

  getAvailablePositions() {
    let positions = []
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.posIsAvailable(row, col))
          positions.push([row, col])
      }
    }
    return positions
  }

  addCell(val) {
    if (this.availablePositions.length === 0) return
    const pos = this.availablePositions.rChoicePop()
    this.list.addNode(val, [pos[0], pos[1]])
    console.log(`assigning: ${pos}`)
    this.matVals[pos[0]][pos[1]] = [val, null]
    let lastPos = this.list.getSecondToLastPos() // sloppy dop but im in a rush
    if (lastPos)
      this.matVals[lastPos[0]][lastPos[1]][1] = pos
  }

  delCell(idx) {
    if (idx > this.list.length-1) return false
    const pos = this.list.delNode(idx)
    this.matVals[pos[0]][pos[1]] = null
  }

}
