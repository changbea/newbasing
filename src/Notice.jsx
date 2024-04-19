import { useState, useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import Message from './Message'

function Notice({ isLoggedIn, userObj }) {
  const [choose, setChoose] = useState(0);
  const [messages, setMessages] = useState([]);

  const onClick = (num) => setChoose(num)

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setMessages(newArray)
    })
  }, [])

  return (  
    <div>
        <div className='d-flex justify-content-center'>게시판</div>
        <div className='d-flex justify-content-center btn-group btn-group-toggle'>
            {choose === 0 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => setChoose(1)}>빌리기 게시판</button>
                    <button className='btn btn-outline-primary' onClick={() => setChoose(2)}>빌려주기 게시판</button>
                </div>
            }
            {choose === 1 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => setChoose(1)}>빌리기 게시판</button>
                    <button className='btn btn-outline-primary' onClick={() => setChoose(2)}>빌려주기 게시판</button>
                </div>
            }
            {choose === 2 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => setChoose(1)}>빌리기 게시판</button>  
                    <button className='btn btn-outline-primary active' onClick={() => setChoose(2)}>빌려주기 게시판</button>  
                </div>
            }
        </div>
        {choose !== 0 && messages.map((msg) => {
            if (msg.text.choose === choose && msg.round === 1) {
                return(
                    <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn}/>
                )
            }
        })}
        {choose !== 0 && 
          <button className='btn btn-outline-primary' onClick={() => onClick(0)}>닫기</button>
        }
    </div>
  )
}

export default Notice
