import Home from './components/home'
import { CategoryPicker } from './components/category-picker'
import Settings from './components/settings'


function clearNode(node) {
  node.innerHTML = ''
}

function goToHome() {
  clearNode(document.querySelector('.main-container'))
  const homePage = new Home({
    categorySelected: (category) => {
      console.log('category selected ' + category)
      const categoryPage = new CategoryPicker({
        homeBtnOnClick: function () {
          goToHome()
        },
        categoryClick: function (roundNumber) {
          console.log(roundNumber)
        }
      })
      const categoryResult = categoryPage.render()
      clearNode(document.querySelector('.main-container'))
      document.querySelector('.main-container').appendChild(categoryResult)
    },
    onSettingsClick: () => {
      const settingsPage = new Settings({
        onSaveSettings: function () {
          goToHome()
        }
      })
      const settingsResult = settingsPage.render()
      clearNode(document.querySelector('.main-container'))
      document.querySelector('.main-container').appendChild(settingsResult)
    },
  })
  const result = homePage.render()
  document.querySelector('.main-container').appendChild(result)
}

goToHome()

