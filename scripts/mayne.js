// This source code is distrubited under the terms of the Bad Code License.
// You are forbidden from distributing software containing this code to end
// users, because it is bad

var totalGifs = 145
var totalSounds = 20
var speech = 'speechSynthesis' in window

function getRandomNumber (max, min = 1) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function createGif () {
  var n = getRandomNumber(totalGifs)
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
  if (typeof window.Audio !== 'function') return
  var n

  if (e.keyCode) {
    n = getNumberFromKey(e.keyCode)
    if (!n) return
  }

  if (!n) n = getRandomNumber(totalSounds)

  var el = new Audio()
  el.src = '/sounds/' + n + '.wav'
  el.play()

  createGif()
}

const light = [
  'light mode activated',
  'dark mode deactivated',
  'maximum brightness achieved',
  'this is as bright as it gets',
  'retinal destruction initiated',
  'darkness is overrated',
  'here we go again'
]
const dark = [
  'light mode deactivated',
  'dark mode activated',
  'whiteness obliterated',
  'enter the darkness',
  'take a visual break',
  'light is overrated',
  'why are you still doing this?'
]
let lightClicks = 0
let darkClicks = 0

function flipMode () {
  var $bod = $('.intro')
  var $mod = $('#mode')
  var lmtm = 'LightMode™'
  var on = $bod.hasClass(lmtm)
  if (on) {
    $bod.removeClass(lmtm)
    $mod.text('🌙')
    speak(dark[darkClicks++ % 7])
  } else {
    $bod.addClass(lmtm)
    $mod.text('🌞')
    speak(light[lightClicks++ % 7])
  }
}

function getNumberFromKey (code) {
  if (!code) return null

  var key = keyCode(code)

  switch (key) {
    // first row
    case 'q': return 1
    case 'w': return 2
    case 'e': return 3
    case 'r': return 4
    case 't': return 5
    case 'y': return 6
    case 'u': return 7
    case 'i': return 8
    case 'o': return 9
    case 'p': return 10

    // second row
    case 'a': return 11
    case 's': return 12
    case 'd': return 13
    case 'f': return 14
    case 'g': return 15
    case 'h': return 16
    case 'j': return 17
    case 'k': return 18
    case 'l': return 19
    case ';': return 20

    default: return null
  }
}

function speak (txt) {
  if (!('speechSynthesis' in window)) return
  var voices = speechSynthesis.getVoices()

  var msg = new SpeechSynthesisUtterance(txt)
  msg.voice = voices[getRandomNumber(voices.length - 1)]
  speechSynthesis.speak(msg)
}

document.addEventListener('DOMContentLoaded', function (event) {
  $('.title').lettering()
  $('.title > span').on('click', playSound)
  $('#mode').on('click', flipMode)
  setInterval(createGif, 94)
})

document.addEventListener('keydown', playSound)
