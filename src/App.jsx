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

const guessesQty = 3

function App() {
  const [count, setCount] = useState(0)
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]) 

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //Object.keys --> Tá pegando todas as chaves de busca do meu array "words"
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }

  }, [words])
//start the secret-word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates()

    //pick word and pick category
    const { word, category } = pickWordAndCategory()
    console.log(word)

    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

//process the letter input
const verifyLetter = (letter) => {
  const normalizedLetter = letter.toLowerCase()

  //check if letter has already been utilized
  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
    return
  }

  //push guessed letter or remove a chance
  if(letters.includes(normalizedLetter)) {
    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters, normalizedLetter
    ])
  } else {
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters, normalizedLetter
    ])

    //actualGuesses representa o valor atual do estado 'guesses'
    setGuesses((actualGuesses) => actualGuesses - 1)
  }

}

const clearLetterStates = () => {
  setGuessedLetters([])
  setWrongLetters([])
}

//Check if guesses ended
useEffect(() => {
  if(guesses <= 0) {
    //reset all states
    clearLetterStates()
    setGameStage(stages[2].name)
  }
}, [guesses])

//check win condition
useEffect(() => {
  const uniqueLetters = [... new Set(letters)]

  //win condition
  if(gameStage === 'game' && guessedLetters.length === uniqueLetters.length) {
    //add score
    setScore((actualScore) => actualScore += 100)

    //restart the game with a new word
    startGame()
  }
}, [guessedLetters, letters, startGame]) // Uma função não pode ser dependência de useEffect! Vamos resolver isso com o useCallBack
//restarts the game
const retry = () => {
  setScore(0)
  setGuesses(guessesQty)
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
        {gameStage === 'end' && <GameOver retry={retry} score={score} />}
      </div>
    </>
  )
}

export default App
