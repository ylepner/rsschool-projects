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

/* const form = document.getElementById('form')
const date = document.getElementById('date')
const time = document.getElementById('time')
const userName = document.getElementById('userName')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const ticket = document.getElementById('ticket')
debugger
userName.oninput = (evt) => {
  console.log(evt)
} */

/* form.addEventListener('submit', (e) => {
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
} */

/* function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a - zA - Z0 - 9])?(?: \.[a - zA - Z0 - 9](?: [a - zA - Z0 - 9 -]{ 0, 61}[a - zA - Z0 - 9]) ?)* $ /.test(email)
} */


