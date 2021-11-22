export class QuizLoader {
  async _load() {
    const url = 'assets/images.json'
    const res = await fetch(url);
    const data = await res.json();
    data.forEach((picture, i) => {
      picture.imgUrl = `https://raw.githubusercontent.com/ylepner/image-data/master/img/${i}.jpg`
    })
    Object.freeze(data)
    return data
  }

  // функция чтобы каждый раз не грузить данные
  load() {
    if (!this._dataPromise) {
      this._dataPromise = this._load()
    }
    return this._dataPromise
  }

  async getAuthors() {
    const data = await this.load()
    const resultAuthors = data.map(picture => picture.author)
    const resultAuthorsSet = Array.from(new Set(resultAuthors))
    return resultAuthorsSet
  }

  async getPicture() {
    const data = await this.load()
    const resultImgPaths = data.map(picture => {
      const imageNumber = picture.imageNum
      const picturePath = `https://raw.githubusercontent.com/ylepner/image-data/master/img/${imageNumber}.jpg`
      return picturePath
    })
  }

  async getQuizQuestionRound(picture) {
    const correctAnswer = picture.author
    const answers = await this.getAnswersRandomArray(correctAnswer)
    answers.push(correctAnswer)
    const answersSorted = answers.sort(() => .5 - Math.random())
    const correctAnswerNumber = answersSorted.indexOf(correctAnswer)

    const quizQuestion = {
      question: "Who is the author of this picture?",
      answers: answersSorted,
      image: `https://raw.githubusercontent.com/ylepner/image-data/master/img/${picture.imageNum}.jpg`,
      correctAnswer: correctAnswerNumber,
      picture: picture,
    }
    return quizQuestion
  }

  async getQuizes() {
    let data = await this.load()
    data = [...data];
    const dataSplit = []
    const cardsPerQuiz = 10;
    for (let i = 0; i < data.length - 1; i + cardsPerQuiz) {
      dataSplit.push(data.splice(i, i + cardsPerQuiz))
    }

    const result = await Promise.all(dataSplit.map(chunk => this.toQuizQuestion(chunk)))
    return result
  }

  async getAnswersRandomArray(correctAnswer) {
    const answers = await this.getAuthors()
    const answersArrLength = answers.length
    const answersArray = []
    for (let i = 0; i < 3;) {
      let randomNumber = Math.floor(Math.random() * answersArrLength)
      if (answers[randomNumber] !== correctAnswer) {
        answersArray.push(answers[randomNumber])
        i++
      }

    }
    return answersArray
  }

  async toQuizQuestion(chunk) {
    const result = []
    for (let picture of chunk) {
      const q = await this.getQuizQuestionRound(picture);
      result.push(q)
    }

    return result
  }

  async getRounds() {
    const quizes = await this.getQuizes()
    return quizes.map(quiz => {
      return {
        score: 0,
        imgUrl: quiz[0].image
      }
    })
  }
}