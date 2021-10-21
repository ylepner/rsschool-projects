const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuoteButton = document.querySelector('.change-quote')
let data;
let current;

async function getQuotes() {
  const res = await fetch('assets/quotes.json');
  data = await res.json();
  console.log(data)
  updateText()
}

getQuotes();

changeQuoteButton.onclick = updateText


function updateText() {
  let textItem = data[Math.floor(Math.random() * data.length)]
  quote.textContent = textItem.text
  author.textContent = textItem.author
}


