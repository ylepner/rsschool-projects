/* slider */

const slider = tns({
  container: '.my-slider',
  items: 1,
  slideBy: 'page',
  controlsContainer: ".welcome-slider-arrows",
  navContainer: ".welcome-slider-button",
  mouseDrag: true,
  center:true,
});



slider.events.on('indexChanged', function(sliderInfo){
  console.log(sliderInfo.index)
  document.getElementById('img-index').innerText = '0' + sliderInfo.index
});



const bar = document.getElementsByClassName('explore-img-slider-bar')[0]
let isDragging = false
bar.addEventListener('mousedown', (evt)=> {
  bar.style['pointer-events'] = 'none'
  isDragging = true
});

const canvas = document.getElementsByClassName('explore-img')[0]
const r = document.querySelector(':root');
canvas.addEventListener('mousemove', (evt)=> {
  if (!isDragging) {
    return
  }
  console.log(evt)
  r.style.setProperty('--image-compare-slider-position', evt.offsetX+'px');
})

document.addEventListener('mouseup', ()=> {
  isDragging = false
  bar.style['pointer-events'] = ''
})




/* video  */

const progressVideo = document.querySelector('.progress-video');

progressVideo.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

const progressVolume = document.querySelector('.progress-volume');

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`
})

document.getElementById("menu-toggle").onclick = function () {
  document.body.classList.toggle("mobile-menu-close")
  document.body.classList.toggle("mobile-menu-open")
}

