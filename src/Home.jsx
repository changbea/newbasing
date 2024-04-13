import { useState, useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Auth from './Auth'
import Message from './Message'
import Notice from './Notice'
import Add from './Add'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function Home({ isLoggedIn, userObj }) {
    const [borrow, setBorrow] = useState(true);
    const [noticeBorrow, setNoticeBorrow] = useState(true);
    const [count, setCount] = useState('');
    const [counter, setCounter] = useState('');
    const [messages, setMessages] = useState([]);
    
    const noticeBorrowOnClick = (boolean) => setNoticeBorrow(boolean)
    
    useEffect(() => {
        onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setMessages(newArray)
        })
    })
    
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center'>Welcome {userObj.displayName}</div>
            <Add isLoggedIn={isLoggedIn} userObj={userObj}/>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker label="Basic time picker" />
                </DemoContainer>
            </LocalizationProvider> */}
            <Notice isLoggedIn={isLoggedIn} userObj={userObj}/>
        </div>

    )
}

export default Home