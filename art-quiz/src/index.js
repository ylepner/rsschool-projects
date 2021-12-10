import Home from './components/home';
import { CategoryPicker } from './components/category-picker';
import Settings from './components/settings';
import { Quiz } from './components/quiz';
import { QuizResult } from './components/quiz-result';
import { QuizLoader } from './quiz-loader';


const quizLoader = new QuizLoader();


function clearNode(node) {
  node.innerHTML = '';
}

function clearContent() {
  clearNode(document.querySelector('.main-container'));
}

function putContent(element) {
  document.querySelector('.main-container').appendChild(element);
}

function loadSettings() {
  const json = localStorage.getItem('settings');
  if (!json) {
    return {
      timer: null,
      volume: null,
    };
  }
  return JSON.parse(json);
}

function goToQuizResultPage(results) {
  const quizResultPage = new QuizResult(results);
  const element = quizResultPage.render();
  clearContent();
  putContent(element);
}

const settings = loadSettings();

function saveSettings() {
  localStorage.setItem('settings', JSON.stringify(settings));
}


function goToQuiz(questions) {
  const quizPage = new Quiz({
    questions,
    quizFinished: (quizResult) => {
      const resultQuiz = questions.map((question, i) => ({
        picture: question.picture,
        isCorrectAnswer: quizResult[i],
      }));
      const quizParams = {
        quizResult: {
          results: resultQuiz,
        },
      };
      goToQuizResultPage(quizParams);
    },
    timer: settings.timer,
    volume: settings.volume,
  });
  const element = quizPage.render();
  clearContent();
  putContent(element);
}


async function goToHome() {
  const rounds = await quizLoader.getRounds();
  clearNode(document.querySelector('.main-container'));
  const homePage = new Home({
    categorySelected: () => {
      const categoryPage = new CategoryPicker({
        homeBtnOnClick() {
          goToHome();
        },
        async categoryClick(roundNumber) {
          const quizes = await quizLoader.getQuizes();
          goToQuiz(quizes[roundNumber]);
        },
        rounds,
        buttonScoreClick() {
          goToQuizResultPage();
        },
      });
      const categoryResult = categoryPage.render();
      clearNode(document.querySelector('.main-container'));
      document.querySelector('.main-container').appendChild(categoryResult);
    },
    onSettingsClick: () => {
      const settingsPage = new Settings({
        onSaveSettings(timer, volume) {
          settings.timer = timer;
          settings.volume = volume;
          saveSettings();
          goToHome();
        },
        timerInputValue: settings.timer,
        volumeInputValue: settings.volume,
      });
      const settingsResult = settingsPage.render();
      clearNode(document.querySelector('.main-container'));
      document.querySelector('.main-container').appendChild(settingsResult);
    },
  });
  const result = homePage.render();
  document.querySelector('.main-container').appendChild(result);
}

document.querySelector('.logo').onclick = goToHome;

goToHome();
