import { useState } from 'react'
import Sidebar from './components/sidebar'
import Mainpart from './components/mainpart'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <Mainpart/>

    </>
  )
}

export default App
