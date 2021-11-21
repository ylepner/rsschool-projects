export class QuizLoader {
  async _load() {
    const url = 'assets/images.json'
    const res = await fetch(url);
    const data = await res.json();
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

  async getQuizQuestion() {
    const data = await this.load()
    const imgQuiz = data
    const imgNumber = 15
    const picture = imgQuiz[imgNumber]
    const correctAnswer = picture.author
    const answers = await this.getAnswersRandomArray(correctAnswer)
    answers.push(correctAnswer)
    const answersSorted = answers.sort(() => .5 - Math.random())
    const correctAnswerNumber = answersSorted.indexOf(correctAnswer)

    const quizQuestion = {
      question: "Who is the author of this picture?",
      answers: answersSorted,
      image: `https://raw.githubusercontent.com/ylepner/image-data/master/img/${imgNumber}.jpg`,
      correctAnswer: correctAnswerNumber,
    }
    console.log(quizQuestion)
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
    }
    return quizQuestion
  }

  async getQuizes() {
    let data = await this.load()
    data = [...data];
    const dataSplit = []
    for (let i = 0; i < data.length - 1; i + 10) {
      dataSplit.push(data.splice(i, i + 10))
    }

    console.log({ dataSplit })

    const result = await Promise.all(dataSplit.map(chunk => this.toQuizQuestion(chunk)))
    console.log(result)
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
}



// {
//   "author": "Илья Репин",
//     "name": "Вечорници",
//       "year": "1881",
//         "imageNum": "15"
// },


// const quiz = [{
//   question: "Who is the author of this picture?",
//   answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
//   image: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg',
//   correctAnswer: 1
// },
// {
//   question: "Who is the author of this picture?",
//   answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
//   image: 'https://www.placecage.com/200/300',
//   correctAnswer: 1
// }, {
//   question: "Who is the author of this picture?",
//   answers: ['van gogh', 'j.vermeer', 'p.rubens', 'v.serov'],
//   image: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/0.jpg',
//   correctAnswer: 1
// },]