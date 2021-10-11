const bar = document.getElementsByClassName('explore-img-slider-bar')[0]
let isDragging = false
bar.addEventListener('mousedown', (evt) => {
  bar.style['pointer-events'] = 'none'
  isDragging = true
});

const canvas = document.getElementsByClassName('explore-img')[0]
const r = document.querySelector(':root');
canvas.addEventListener('mousemove', (evt) => {
  if (!isDragging) {
    return
  }
  r.style.setProperty('--image-compare-slider-position', evt.offsetX + 'px');
})

document.addEventListener('mouseup', () => {
  isDragging = false
  bar.style['pointer-events'] = ''
})