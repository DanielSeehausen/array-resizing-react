const min = 0
const max = 1

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function(el) {
  const x = getRandom(min, max)
  const y = getRandom(min, max)
  const xDir = Math.random() > 0.5 ? -1 : 1
  const yDir = Math.random() > 0.5 ? -1 : 1

  el.style.left = `${x*xDir}%`
  el.style.top = `${25+(y*yDir)}%`

  setTimeout(() => {
    el.style.left = ""
    el.style.top = "25%"
  }, 75)

}

// export default screenShake
