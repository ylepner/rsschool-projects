const permanentEx = document.querySelector('.permanent')
const temporaryEx = document.querySelector('.temporary')
const combinedEx = document.querySelector('.combined')
const permanentPrice = 20
const temporaryPrice = 25
const combinedPrice = 40
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
  console.log(cart)
  let basicTickets = cart.basic()
  let seniorTickets = cart.senior()
  let price = prices[cart.ticketType]
  let total = price * basicTickets + (price * seniorTickets) / 2
  totalPrice.innerHTML = total
}