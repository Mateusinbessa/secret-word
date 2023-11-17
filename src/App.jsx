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

//start the secret-word game
  const startGame = () => {
    setGameStage(stages[1].name)
  }

//process the letter input
const verifyLetter = () => {
  setGameStage(stages[2].name)
}

//restarts the game
const retry = () => {
  setGameStage(stages[0].name)
}

  return (
    <>
      <div id='Container'>
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
        {gameStage === 'end' && <GameOver retry={retry} />}
      </div>
    </>
  )
}

export default App
