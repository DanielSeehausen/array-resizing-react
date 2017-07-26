import Node from './LLNode'

export default class LinkedList {
  constructor(head=null, tail=null) {
    this.head = null
    this.tail = null
    this.length = 0
  }

  addNode(val, pos) {
    var newNode = new Node(val, pos)
    this.head || (this.head = newNode)  // HERE WE GO
    if (this.tail)
      this.tail.setNext(newNode)
    this.tail = newNode
    this.length++
  }

  delNode(idx) { // not a true delete, still pointing to its next. GC will take care of it
    if (idx > this.length-1) return false
    let currNode = this.head
    while (idx > 1) {
      currNode = currNode.getNext()
      idx--
    }
    const pos = currNode.pos.slice()
    currNode.next = currNode.next.next || null
    console.log(`node at: ${idx} deleted.`)
    this.length--
    return pos
  }

  getSecondToLastPos() { // SLOPPY DOP BUT NO TIME
    if (this.length <= 1 ) return null
    let currIdx = 0
    let currNode = this.head
    while (currIdx < this.length - 2) {
      currNode = currNode.getNext()
      currIdx++
    }
    console.log('second to last: ', currNode.pos)
    return currNode.pos
  }

  updateNode(idx, val) {
    if (idx > this.length-1) return false
    let currNode = this.head
    while (idx > 0) {
      currNode = currNode.next
      idx--
    }
    currNode.setVal(val)
  }

  getValCoordArr() {
    let arr = []
    let currNode = this.head
    while (currNode) {
      arr.push([currNode.val, currNode.pos])
      currNode = currNode.next
    }
    return arr
  }

}
