import html from './index.html';
import './style.css';
import { Component } from '../component';
import { QuizCard } from '../quiz-card';

export class Quiz extends Component {
  constructor(params) {
    super();
    this.questions = params.questions;
    this._activeCard = 0;
    this.quizFinished = params.quizFinished;
    this.results = [];
    this.timer = params.timer;
    this.volume = params.volume;
  }

  getTemplate() {
    return html;
  }

  get activeCard() {
    return this._activeCard;
  }

  set activeCard(value) {
    this._activeCard = value;
    this.updateActiveCard();
  }

  updateActiveCard() {
    this.cardElements.forEach((element, i) => {
      if (i === this.activeCard) {
        if (this.timer) {
          this.cards[i].startCountdown();
        }
        element.classList.add('active');
        element.classList.remove('non-active');
      } else {
        element.classList.remove('active');
        element.classList.add('non-active');
      }
    });
  }

  renderInternal(element) {
    this.cards = this.questions.map(question => new QuizCard({
      image: question.image,
      answers: question.answers,
      timer: this.timer,
      volume: this.volume,
      correctAnswer: question.correctAnswer,
      picture: question.picture,
      answerSelected: (isCorrect) => {
        this.activeCard = this.activeCard + 1;
        this.results.push(isCorrect);
        if (this.activeCard === this.cards.length) {
          this.quizFinished(this.results);
        }
      },
    }));
    this.cardElements = this.cards.map(card => card.render());
    this.cardElements.forEach((result) => {
      element.querySelector('.quiz-container').appendChild(result);
    });
    this.updateActiveCard();
  }
}
