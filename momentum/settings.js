const state = {
  language: 'en',
  photoSource: 'github',

  blocks: [{
    name: 'time',
    enabled: true
  },
  {
    name: 'date',
    enabled: true
  },
  {
    name: 'greeting',
    enabled: true
  },
  {
    name: 'quote',
    enabled: true
  },
  {
    name: 'music',
    enabled: true
  },
  {
    name: 'weather',
    enabled: true
  }]
}

function toggleOption(name) {
  const block = state.blocks.find(block => block.name === name)
  block.enabled = !block.enabled
  updateUI()
}

function updateUI() {
  state.blocks.forEach(block => {
    const widget = document.getElementById(block.name)
    if (!widget) {
      return
    }
    console.log(block)
    if (block.enabled) {
      widget.style.opacity = '1'
    } else {
      widget.style.opacity = '0'
    }
  })
}

function updateImageSourceUI() {

}

const settingList = document.querySelector('.settings-list')

let listItems = state.blocks
  .map((option) => {
    const el = document.createElement('li')
    el.innerHTML = `
    <input type="checkbox" class="setting-check-option" checked>
    ${option.name}
    `
    el.querySelector('input').onchange = (evt) => {
      toggleOption(option.name)
    }
    return el
  })

listItems.forEach(el => settingList.appendChild(el))



const settingButton = document.querySelector('.settings-btn')
const settingPanel = document.querySelector('.setting-panel')

settingButton.onclick = toggleSettingPanel

function toggleSettingPanel() {
  settingPanel.classList.toggle('is-active')
}


// choose image

const imgSource = document.querySelector('.selector-photo-source')
const imgTag = docunemt.querySelector('.selector-photo-tag')

imgSource.onchange = () => {
  updateImageSourceUI()
}