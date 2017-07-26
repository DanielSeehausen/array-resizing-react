export default class Node {
  constructor(val, pos) {
    this.val = val
    this.pos = pos // these will be pointing to Matrix positions (which represent our locations in memory)
    this.next = null
  }

  // isLast() {
  //   return (this.next === null) ? true : false
  // }

  setVal(val) {
    this.val = val
  }

  getNext() {
    return this.next
  }

  setNext(node) {
    this.next = node
  }

  delNext() {
    this.next = null
  }

}
