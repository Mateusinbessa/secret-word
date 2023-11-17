//react
import { useState, useEffect, useCallback } from 'react'

//css
import './App.css'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game.jsx'
import GameOver from './components/GameOver.jsx'

//data
import {wordsList} from "./data/words.jsx"

//stages
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {
  const [count, setCount] = useState(0)
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]) // array pq é uma lista de letras

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //Object.keys --> Tá pegando todas as chaves de busca do meu array "words"
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }

  }
//start the secret-word game
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

//process the letter input
const verifyLetter = (letter) => {
  console.log(letter)
}

//restarts the game
const retry = () => {
  setGameStage(stages[0].name)
}

  return (
    <>
      <div id='Container'>
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' &&
         <Game verifyLetter={verifyLetter}
               pickedWord={pickedWord} 
               pickedCategory={pickedCategory} 
               letters={letters}
               wrongLetters={wrongLetters}
               guessedLetters={guessedLetters}
               guesses={guesses}
               score={score} />}
        {gameStage === 'end' && <GameOver retry={retry} />}
      </div>
    </>
  )
}

export default App
