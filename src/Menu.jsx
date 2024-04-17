import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import '@mantine/dropzone/styles.css';
import Message from './Message'

function Menu({ isLoggedIn, userObj }) {
  const [choose, setChoose] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => {
            return ({
                id: document.id,
                ...document.data(),
            })
        });
        setMessages(newArray)
    })
  }, [])

  const onClick = () => {
    setChoose(true)
  }
  return (
    <div className='d-flex justify-content-center flex-column pb-5'>
        <button className='btn btn-outline-primary' onClick={() => setChoose(true)}>My status</button>
        {choose && 
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center'>borrow status</div>
                {messages.map((msg) => {
                    if(msg.creatorId === userObj.uid) {
                        if(msg.text.choose === 1) {
                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
                        }
                    }
                })}
            <div className='d-flex justify-content-center'>lend status</div>
                {messages.map((msg) => {
                    if(msg.creatorId === userObj.uid) {
                        if(msg.text.choose === 2) {
                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
                        }
                    }
                })}
            <div className='d-flex justify-content-center'>helping status</div>
                {messages.map((msg) => {
                    if(msg.connectedId === userObj.uid) {
                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
                    }
                })}
            <button className='btn btn-outline-primary' onClick={() => setChoose(false)}>close</button>
        </div>
        }
    </div>  
  )
}

export default Menu
