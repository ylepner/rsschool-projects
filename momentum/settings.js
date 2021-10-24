let state = {
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

const eventListeners = {

};

function setSettingsEventListener(field, callback) {
  eventListeners[field] = callback;
}

function callEventListener(field) {
  if (eventListeners[field]) {
    eventListeners[field]();
  }
}

inputBindings = [];

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
    if (block.enabled) {
      widget.style.opacity = '1'
    } else {
      widget.style.opacity = '0'
    }
  })

}

function updateImageSourceUI() {
  if (state.photoSource === 'unsplash' || state.photoSource === 'flickr') {
    imgTag.classList.add('is-visible')
  } else {
    imgTag.classList.remove('is-visible')
  }
  callEventListener('photoSource');
}

const settingList = document.querySelector('.settings-list')

let listItems = state.blocks
  .map((option, i) => {
    const el = document.createElement('li')
    el.innerHTML = `
    <input type="checkbox" class="setting-check-option" checked>
    ${option.name}
    `
    el.querySelector('input').onchange = (evt) => {
      toggleOption(option.name)
    }

    inputBindings.push(() => {
      el.querySelector('input').checked = state.blocks[i].enabled
    })


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

const imgSource = document.querySelector('.selector-photo-source-input')
const imgTag = document.querySelector('.selector-photo-tag')

imgSource.onchange = (evt) => {
  state.photoSource = imgSource.value
  updateImageSourceUI()
}


window.addEventListener('beforeunload', function setLocalStorage() {
  localStorage.setItem('settings', JSON.stringify(state));
})

window.addEventListener('load', () => {
  if (localStorage.getItem('settings')) {

    state = JSON.parse(localStorage.getItem('settings'))
    updateUI()
    imgSource.value = state.photoSource
    updateImageSourceUI()
    inputBindings.forEach(fn => fn())
  }
})



