// This source code is distrubited under the terms of the Bad Code License.
// You are forbidden from distributing software containing this code to end
// users, because it is bad

var totalGifs = 141
var totalSounds = 20
var speech = 'speechSynthesis' in window

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

function flipMode () {
  var $bod = $('.intro')
  var $mod = $('#mode')
  var lmtm = 'LightMode™'
  var on = $bod.hasClass(lmtm)
  if (on) {
    $bod.removeClass(lmtm)
    $mod.text('🌙')
    speak('light mode deactivated')
  } else {
    $bod.addClass(lmtm)
    $mod.text('🌞')
    speak('light mode activated')
  }
}

function speak (txt) {
  if (!('speechSynthesis' in window)) return
  var voices = speechSynthesis.getVoices()

  var msg = new SpeechSynthesisUtterance(txt)
  msg.voice = voices[getNumber(voices.length - 1)]
  speechSynthesis.speak(msg)
}

document.addEventListener('DOMContentLoaded', function (event) {
  $('.title').lettering()
  $('.title > span').on('click', playSound)
  $('#mode').on('click', flipMode)
  setInterval(createGif, 94)
  speak('welcome to the cool gifs site')
})
