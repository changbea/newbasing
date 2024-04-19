import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { MobileDateTimeRangePicker } from '@mui/x-date-pickers-pro/MobileDateTimeRangePicker';
import { DesktopDateTimeRangePicker } from '@mui/x-date-pickers-pro/DesktopDateTimeRangePicker';
import dayjs from 'dayjs';
import Adding from './Adding';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '@mantine/dropzone/styles.css';
import Alert from '@mui/material/Alert';
import Auth from './Auth'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getAuth, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Ranking({ isLoggedIn, userObj }) {
  const [choose, setChoose] = useState(0);
  const [rank, setRank] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setRank(newArray)
    })
  }, [])

  return (
    <div className='d-flex flex-column'>
        <div>
            유저 랭킹 / 유저 이름 / 포인트 
        </div>
        <ol className='list-group'>
            {rank.map((element) => {
                return(
                    <li key={element.uid} className='list-group'>
                        <span className='list-group-item list-group-item-primary'>{rank.indexOf(element)+1}. {element.displayName} / {element.points}</span>
                    </li>
                )
            })}
        </ol>
    </div>  
  )
}

export default Ranking
