/* slider */

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

/* slider explore */

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
  console.log(evt)
  r.style.setProperty('--image-compare-slider-position', evt.offsetX + 'px');
})

document.addEventListener('mouseup', () => {
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

/* slider video */

const sliderVideo = tns({
  container: '.video-carousel',
  items: 3,
  slideBy: 1,
  controlsContainer: ".video-slider",
  navContainer: ".video-slider-dot",
  center: true,
});

document.querySelector('.prev-button').onclick = function () {
  sliderVideo.goTo('prev');
};

document.querySelector('.next-button').onclick = function () {
  sliderVideo.goTo('next');
};

// stop video

sliderVideo.events.on('indexChanged', function (sliderInfo) {
  Array.from(document.getElementsByClassName('video-carousel')[0].querySelectorAll('iframe')).forEach(iframe => {
    iframe.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  })
});



/* validation */

const form = document.getElementById('form')
const date = document.getElementById('date')
const time = document.getElementById('time')
const userName = document.getElementById('userName')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const ticket = document.getElementById('ticket')

form.addEventListener('submit', (e) => {
  console.log(e)
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const daeValue = date.value.trim()
  const timeValue = time.value.trim()
  const userNameValue = userName.value.trim()
  const emailValue = email.value.trim()
  const phoneValue = phone.value.trim()
  const ticketValue = ticket.value.trim()

  if (userNameValue === '') {
    setErrorFor(userName, 'Name cannot be blank')
  } else {
    setSuccessFor(userName)
  }
  if (email === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setSuccessFor(email, 'Email is not valid')
  } else {
    setSuccessFor(email);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  small.innerText = message;

  formControl.className = 'form-control error'
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'
}

/* function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}
  [a - zA - Z0 - 9])?(?: \.[a - zA - Z0 - 9](?: [a - zA - Z0 - 9 -]{ 0, 61}[a - zA - Z0 - 9]) ?)* $ /.test(email)
} */


/* gallery */

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll)
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffSet = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > animItemOffSet - animItemPoint) && scrollY < (animItemOffSet + animItemHeight)) {
        animItem.classList.add('active');
      } else {
        animItem.classList.remove('active')
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);

}

