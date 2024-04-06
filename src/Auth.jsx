import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import styled from 'styled-components'

const NavBtn = styled.button`
  border: dashed;
`
const SignBtn = styled.div`
  display: flex;
  justify-content: center;
`

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)
  const [error, setError] = useState('')
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)
  
  return (  
    <div>
      {/* <nav className='navbar'>
        <NavBtn className='navbar-toggler'>
          <span className='navbar-toggler-icon'></span>
        </NavBtn>
      </nav> */}
      <form onSubmit={onSubmit}>
        <div className='d-flex'>
          {/* <label className='form-label'>Email:</label>
          <span>&emsp;</span> */}
          <input className='form-control' placeholder='Email' name='email' value={email} type='email' onChange={onChange} required/>
        </div>
        <div className='d-flex'>
          {/* <label className='form-label'>Password:</label>
          <span>&emsp;</span> */}
          <input className='form-control' placeholder='Password' name='password' value={password} type='password' onChange={onChange} required/>
        </div>
        <div className='d-flex'>
          <input className='btn btn-outline-primary' value={newAccount ? 'Sign In' : 'Sign Up'} type='submit'/>
          <span>{error}</span>
        </div>
      </form>
      <div className='d-flex flex-column'>
        <button className='btn btn-primary' onClick={onSocialClick}>Continue with Google</button>
        <button className='btn btn-primary' onClick={onSocialClick}>Continue with Google</button>
        <button className='btn btn-primary' onClick={onSocialClick}>Continue with Google</button>
        <button onClick={toggleAccount} className='btn btn-outline-primary'>{newAccount ? 'Sign Up' : 'Sign In'}</button>
      </div>
    </div>
  )
}

export default Auth
