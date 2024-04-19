import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Message from './Message'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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
  const [message, setMessage] = useState([])
  const [messages, setMessages] = useState([])
  const [newDisplayName, setNewDisplayName] = useState([])
  const [num, setNum] = useState(null)
  const element = []
  const elements = []

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = await doc(dbservice, `members/${userObj.uid}`)
    console.log(userObj.uid)
    await updateDoc(data, {displayName: newDisplayName});
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
  
  const getMessage = async () => {
    const msg = query(collection(dbservice, 'num'), where('creatorId', '==', userObj.uid), orderBy('creatorClock', 'asc'))
    
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
      }));
      setMessages(newArray);
    })
  }
  const getMessages = async () => {
    const msg = query(collection(dbservice, 'num'), where('connectedId', '==', userObj.uid), orderBy('creatorClock', 'asc'))
    
    onSnapshot(msg, (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
      }));
      setMessage(newArray);
    })
  }

  useEffect(() => {
    getMessage()
  })

  useEffect(() => {
    getMessages()
  })
  

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
        // const number = snapshot.docs.map((document) => ({
        //     ...document.data(),
        // }));
        const number = snapshot.data().points
        console.log(number)
        setNum(number)
    })
  }, [])
  // console.log(num)

  return (  
    <div>
      <div>제 유저 이름은 {userObj.displayName}</div>
      <form onSubmit={onSubmit}>
        <div className='d-flex justify-content-center'>
          <input className='form-control' placeholder='유저 이름 바꾸기' value={newDisplayName} type='text' onChange={onChange} />
        </div>
        <div className='d-flex justify-content-center'>
          <input className='btn btn-outline-primary' value='완료' type='submit' />
        </div>
      </form>
      <div>
        내 포인트: {num}
      </div>
      <div>
        최근 완료된 빌리기/빌려주기: {message.length+messages.length}
      </div>
      <div>
        {message.map((msg) => {
          if (msg.round === 5) {
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
          }
        })}
      </div>
      <div>
        {messages.map((msg) => {
          if (msg.round === 5) { 
            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
          }
        })}
      </div>
    </div>
  )
}

export default Profile
