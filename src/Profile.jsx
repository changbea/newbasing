import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components'

const NavBtn = styled.button`
  border: dashed;
`
const SignBtn = styled.div`
  display: flex;
  justify-content: center;
`

function Profile({ userObj }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const [newDisplayName, setNewDisplayName] = useState([])

  const onSubmit = async (event) => {
    event.preventDefault()
    await updateProfile(userObj, {
      displayName: newDisplayName
    }).then(() => {
      window.location.reload(true)
    }).catch((error) => {
      console.log('error')
    })
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }
  
  const getMessages = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', userObj.uid), orderBy('creatorClock', 'asc'))
    
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
      }));
      setMessages(newArray);
    })
  }

  useEffect(() => {
    getMessages()
  })

  return (  
    <div>
      <form onSubmit={onSubmit}>
        <div className='border border-primary'>
          <br/>
        </div>
        <div className='d-flex justify-content-center'>
          <input className='form-control' placeholder='Profile: display name' value={newDisplayName} type='text' onChange={onChange} />
        </div>
        <div className='d-flex justify-content-center'>
          <input className='btn btn-outline-primary' value='update profile' type='submit' />
        </div>
      </form>
      <div>
        {/* {messages.map((msg) => )} */}
      </div>
    </div>
  )
}

export default Profile
