const slider = tns({
  container: '.my-slider',
  items: 1,
  slideBy: 'page',
  controlsContainer: ".welcome-slider-arrows",
  navContainer: ".welcome-slider-button",
  mouseDrag: true,
  center: true,
});


slider.events.on('indexChanged', function (sliderInfo) {
  console.log(sliderInfo.index)
  document.getElementById('img-index').innerText = '0' + sliderInfo.index
});
