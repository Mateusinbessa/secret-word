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
  {id: 2, name: "gamer"},
  {id: 3, name: "end"},
]

function App() {
  const [count, setCount] = useState(0)
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  console.log(words)

  return (
    <>
      <div id='Container'>
        {gameStage === 'start' && <StartScreen />}
        {gameStage === 'game' && <Game />}
        {gameStage === 'end' && <GameOver />}
      </div>
    </>
  )
}

export default App
