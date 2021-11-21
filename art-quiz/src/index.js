import Home from './components/home'
import { CategoryPicker } from './components/category-picker'
import Settings from './components/settings'
import QuizCard from './components/quiz-card'
import { Quiz } from './components/quiz'
import { QuizResult } from './components/quiz-result'
import { QuizLoader } from './quiz-loader'


function clearNode(node) {
  node.innerHTML = ''
}

function clearContent() {
  clearNode(document.querySelector('.main-container'))
}

function putContent(element) {
  document.querySelector('.main-container').appendChild(element)
}

const quiz = [{
  question: "Who is the author of this picture?",
  answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
  image: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg',
  correctAnswer: 1
},
{
  question: "Who is the author of this picture?",
  answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
  image: 'https://www.placecage.com/200/300',
  correctAnswer: 1
}, {
  question: "Who is the author of this picture?",
  answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
  image: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg',
  correctAnswer: 1
},]

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
          goToQuiz(quiz)
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
goToQuiz(quiz)
goToQuizResultPage()

function goToQuiz(questions) {
  const quizPage = new Quiz({
    questions: questions,
    quizFinished: (quizResult) => {
      console.log(questions, quizResult);
      goToQuizResultPage(quizResult)
    }
  })
  const element = quizPage.render()
  clearContent()
  putContent(element)

}

function goToQuizResultPage(results) {
  const quizResultPage = new QuizResult({
    quizResult: {
      results: [{
        picture: {
          author: 'Илья Репин',
          name: 'Проводы новобранца',
          year: '1879',
          imgURL: 'https://raw.githubusercontent.com/irinainina/image-data/master/img/100.jpg'
        },
        isCorrectAnswer: true
      }, {
        picture: {
          author: 'Илья Репин',
          name: 'Проводы новобранца',
          year: '1879',
          imgURL: 'https://raw.githubusercontent.com/irinainina/image-data/master/img/108.jpg'
        },
        isCorrectAnswer: false
      }]
    }
  })
  const element = quizResultPage.render()
  clearContent()
  putContent(element)

}

document.querySelector('.logo').onclick = goToHome

const quizLoader = new QuizLoader()
quizLoader.load()
quizLoader.getAuthors()
quizLoader.getQuiz()
quizLoader.getPicture()

goToHome()

