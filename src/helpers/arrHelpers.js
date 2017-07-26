Array.prototype.extend = function(arrB) {
    for (var el of arrB)
      this.push(el)
    // this = this.concat(arrB) // concat throwing left hand side assignment error oop
    return this
}

Array.prototype.rChoicePop = function() {
  const idx = Math.floor(Math.random() * this.length)
  const el = this[idx]
  this.splice(idx, 1)
  return el
}
