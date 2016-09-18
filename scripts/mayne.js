function createGif () {
  var max = 101
  var n = Math.floor(Math.random() * max) + 1
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

document.addEventListener('DOMContentLoaded', function (event) {
  $('.title').lettering()
  setInterval(createGif, 100)
})
