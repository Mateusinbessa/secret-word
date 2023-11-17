import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='Container'>
        <h2>Secret word</h2>
      </div>
    </>
  )
}

export default App
