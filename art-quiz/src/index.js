import Home from './components/home'
import { CategoryPicker } from './components/category-picker'
import Settings from './components/settings'
import { Quiz } from './components/quiz'
import { QuizResult } from './components/quiz-result'
import { QuizLoader } from './quiz-loader'
import { Card } from './components/card'


function clearNode(node) {
  node.innerHTML = ''
}

function clearContent() {
  clearNode(document.querySelector('.main-container'))
}

function putContent(element) {
  document.querySelector('.main-container').appendChild(element)
}
const quizLoader = new QuizLoader()

async function goToHome() {
  const rounds = await quizLoader.getRounds()
  clearNode(document.querySelector('.main-container'))
  const homePage = new Home({
    categorySelected: (category) => {
      console.log('category selected ' + category)
      const categoryPage = new CategoryPicker({
        homeBtnOnClick: function () {
          goToHome()
        },
        categoryClick: async function (roundNumber) {
          const quizes = await quizLoader.getQuizes()
          goToQuiz(quizes[roundNumber])
        },
        rounds: rounds,
        buttonScoreClick: function (roundNumber) {
          // список пройденных раундов quizResult из сохраненных 
          goToQuizResultPage()
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
// goToQuiz(quiz)
//goToQuizResultPage()

function goToQuiz(questions) {
  console.log(questions)
  const quizPage = new Quiz({
    questions: questions,
    quizFinished: (quizResult) => {
      console.log('Quiz result', questions, quizResult);
      const resultQuiz = questions.map((question, i) => {
        return {
          picture: question.picture,
          isCorrectAnswer: quizResult[i]
        }
      })
      const quizParams = {
        quizResult: {
          results: resultQuiz,
        }
      }
      goToQuizResultPage(quizParams)
    }
  })
  const element = quizPage.render()
  clearContent()
  putContent(element)

}


function goToQuizResultPage(results) {
  const quizResultPage = new QuizResult(results)
  const element = quizResultPage.render()
  clearContent()
  putContent(element)

}

document.querySelector('.logo').onclick = goToHome

// const quizLoader = new QuizLoader()

quizLoader.getQuizes()

