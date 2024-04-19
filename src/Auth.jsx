import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Add from './Add'
import Notice from './Notice'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';

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
        
        await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
          uid: data.user.uid,
          displayName: data.user.uid,
          points: 0,
        })
        await updateProfile(data.user, {
          displayName: data.user.uid
        }).catch((error) => {
          console.log('error')
        })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
      setNewAccount(false)
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
      <form onSubmit={onSubmit}>
        <div className='d-flex'>
          {/* <label className='form-label'>Email:</label>
          <span>&emsp;</span> */}
          <input className='form-control' placeholder='이메일' name='email' value={email} type='email' onChange={onChange} required/>
        </div>
        <div className='d-flex'>
          {/* <label className='form-label'>Password:</label>
          <span>&emsp;</span> */}
          <input className='form-control' placeholder='비밀번호' name='password' value={password} type='password' onChange={onChange} required/>
        </div>
        <div className='d-flex'>
          <input className='btn btn-outline-primary' value={newAccount ? '회원가입' : '로그인'} type='submit'/>
          <span>{error}</span>
        </div>
      </form>
      <div className='d-flex flex-column'>
        <button className='btn btn-primary' onClick={onSocialClick}>구글로 로그인</button>
        <button onClick={toggleAccount} className='btn btn-outline-primary'>{newAccount ? '로그인' : '회원가입'}</button>
      </div>
    </div>
  )
}

export default Auth
