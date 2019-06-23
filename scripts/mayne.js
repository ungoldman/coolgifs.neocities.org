var totalGifs = 131
var totalSounds = 20

function getNumber (max) {
  return Math.floor(Math.random() * max) + 1
}

function createGif () {
  var n = getNumber(totalGifs)
  var offset = Math.floor(Math.random() * (window.innerWidth + 100) - 100)
  var klasses = ['random', 'animate', 'slide-up', 'linear', 'd-80', 'infinite', 'gif']

  var img = document.createElement('img')

  klasses.forEach(function (c) {
    img.classList.add(c)
  })

  img.setAttribute('style', 'left:' + offset+'px')
  img.setAttribute('src', '/gifs/' + n + '.gif')

  document.querySelector('body').appendChild(img)

  setTimeout(function(){ img.remove() }, 20000)
}

function playSound (e) {
  e.preventDefault()
  var n = getNumber(totalSounds)
  if (typeof window.Audio === 'function') {
    var el = new Audio()
    el.src = '/sounds/' + n + '.wav'
    el.play()
  }
  createGif()
}

document.addEventListener('DOMContentLoaded', function (event) {
  $('.title').lettering()
  $('.title > span').on('click', playSound)
  setInterval(createGif, 94)
})
