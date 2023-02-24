const getRandomNunInRange = (min, max) => {
  const RandomNun = (Math.random() * (max - min) + min).toFixed(0)
  return RandomNun
}

const gameState = {
  taskInProcess: false,
  rightAnswer: null,
}

const getTask = () => {
  // const randomNum1 = getRandomNunInRange(0, 100)
  // const randomNum2 = getRandomNunInRange(0, 100)

  //let symbol
  // if (Math.random() > 0.5) {
  // symbol = "+"
  // } else {
  //     symbol = "-"
  // }
  const task = `${getRandomNunInRange(0, 100)} ${symbol} ${getRandomNunInRange(0, 100)}`

  gameState.rightAnswer = eval(task)

  return task
}
//или можно написать так:
const symbol = (Math.random() > 0.5) ? "+" : "-"

const toggleGameState = () => {
  gameState.taskInProcess = !gameState.taskInProcess
}

const gameEl = document.getElementById("my_game").children

const title = gameEl[0]
const userTask = gameEl[1]
const userAnswer = gameEl[2]
const btnGame = gameEl[3]


const startGameFunc = () => {
  if (!gameState.taskInProcess) {
    title.innerText = "Игра началась!"
    userAnswer.value = null
    //генерируем задачу и ответ
    //const task = getTask()
    //показ задачи  
    userTask.innerText = getTask()
    userAnswer.hidden = false
    btnGame.innerHTML = "Проверить!"
    toggleGameState()
    //смена кнопки
    //смена состояния 
  } else {
    //сраснить ответы
    const isRight = gameState.rightAnswer == userAnswer.value
    //вывод в зависимости от правитьности
    userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
    //поменять кнопку и состояние
    title.innerText = (isRight) ? "Вы победили!" : "Вы проиграли!"
    btnGame.innerHTML = "Начать заново!"
    toggleGameState()
  }
}

btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startGameFunc()
  } else if (e.key === "Escape") {
    userAnswer.blur()
  }
})

// if (isplus) {
//     gameEl[1].innerText = `${randomValue1} + ${randomValue2}`
// } else {
//     gameEl[1].innerText = `${randomValue1} - ${randomValue2}`
// }

// console.log(gameEl)
// 
//console.dir(document)
const chooseEl = document.querySelectorAll('.choosed_block-container > div')
const counterEl = document.querySelector(".choosed_block span")
const choosedState = {
  countElements: 0,
}
const changeCount = (value) => {
  choosedState.countElements += value
  counterEl.innerText = choosedState.countElements
}

const eventFunc = (e) => {
  if (e.target.className === "") {
    e.target.className = "choosed_element"
    changeCount(1)
  } else {
    e.target.className = ""
    changeCount(-1)
  }
}

for (let i = 0; i < chooseEl.length; i++) {
  chooseEl[i].addEventListener("click", eventFunc)

  // if (e.target.className === "") {
  //   e.target.className = "choosed_element"
  //   changeCount(1)
  // } else {
  //   e.target.className = ""
  //   changeCount(-1)
  // }

}

const postsBlock = document.querySelector(".posts_block-container")
const postsBtn = document.querySelector(".posts_block button")
 

fetch('https://jsonplaceholder.typicode.com/posts')
  .then( res => res.json())
  .then(data => {
    for (el of data) {
      addPost(el.title, el.body)
    }
    //addPost(data[7].title, data[7].body)
    
  })

  .catch((err) => console.log(err.message))

function addPost(title, body) {
  const postsTitle = document.createElement("h3")
  const postsBody = document.createElement("span")
  const postsItem = document.createElement("p")

  postsTitle.innerText = title
  postsBody.innerText = body

  postsItem.append(postsTitle, postsBody)
  postsBlock.append(postsItem)
}

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => {
    for (el of data) {
      addPost(el.title, el.body)
    }
    //addPost(data[7].title, data[7].body)
    
  })

  .catch(err => console.log(err.message))
}
//postsBtn.onclick = () => {getPosts()}
getPosts()
// function createPost(title, body, userId) {
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: title,
//       body: body,
//       userId: userId,
//     }),
//     Headers: {
//       'Content-type': 'application/json; charset=UTF-8'
//     },
//   })
//   .then( res => {
// console.log(res)
// return res.json()
//   } )
//   .catch( err => console.log(err.message))
// }
// createPost("title", "body", 15)