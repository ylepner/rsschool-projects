const form = document.getElementById('form')
const date = document.getElementById('date')
const time = document.getElementById('time')
const userName = document.getElementById('userName')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const ticket = document.getElementById('ticket')

userName.oninput = (evt) => {
  console.log(evt.target.value)
  const error = isValidName(evt.target.value)
  const formControl = userName.parentElement
  const small = formControl.querySelector('small')
  small.innerText = error;
}

function isValidName(string) {
  if (string.length <= 3 || string.length > 15) {
    return 'Invalid Text'
  }
}