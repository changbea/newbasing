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
import Menu from './Menu'

function confirm({ userObj, msgObj }) {
  const data = doc(dbservice, `num/${msgObj.id}`)
    // console.log(data)
    updateDoc(data, {round: 3});
}

export default confirm
