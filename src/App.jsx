import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Router from './Router'
import Lottie from 'react-lottie'
import rain from './Animation.json'
import { auth } from './serverbase'

function App() {
  // const [count, setCount] = useState(0)
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <div>
      {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj}/> : <Lottie options={defaultOptions} height={400} width={400} />}
    </div>
  )
}

export default App
