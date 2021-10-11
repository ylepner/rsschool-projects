const permanentEx = document.querySelector('.permanent')
const temporaryEx = document.querySelector('.temporary')
const combinedEx = document.querySelector('.combined')
const basicCounter = document.querySelector('.basic-counter')
const seniorCounter = document.querySelector('.senior-counter')
const totalPrice = document.querySelector('#total-span')



const prices = {
  permanent: 20,
  temporary: 25,
  combined: 40
};


const cart = {
  basic: () => document.getElementById('basic-tickets-count').value,
  senior: () => document.getElementById('senior-tickets-count').value,
  ticketType: 'permanent'
}

document.querySelectorAll('.ticket-type-container input').forEach(el => {
  el.onchange = () => {
    cart.ticketType = el.value;
    updateTotalPrice(cart)
  }
});

document.querySelectorAll('.ticket-amount-counter .btn-change-amount').forEach(el => {
  el.addEventListener('click', (click) => {
    updateTotalPrice(cart)
  })
})

function updateTotalPrice(cart) {
  let basic = cart.basic()
  let senior = cart.senior()
  let price = prices[cart.ticketType]
  let total = price * basic + (price * senior) / 2
  totalPrice.innerHTML = total
  localStorage.setItem('cart', JSON.stringify({ basic, senior, ticketType: cart.ticketType }))
}

const restoredCart = localStorage.getItem('cart')
if (restoredCart) {
  const cartRestored = JSON.parse(restoredCart);
  document.getElementById('basic-tickets-count').value = cartRestored.basic
  document.getElementById('senior-tickets-count').value = cartRestored.senior
  document.querySelector(`.ticket-type-item input[value="${cartRestored.ticketType}"]`).checked = true
  updateTotalPrice(cart)
}
