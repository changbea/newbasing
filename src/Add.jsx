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
import Rating from '@mui/material/Rating';
import Popover from '@mui/material/Popover';
import path from './assets/help_FILL0_wght400_GRAD0_opsz24.png';

function Add({ isLoggedIn, userObj }) {
  const [choose, setChoose] = useState(0);
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [move, setMove] = useState(false)
  const [value, setValue] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const roomList = ['one', 'two', 'three', 'four', 'focus']
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setCount(value);
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      setCounter(value);
  }

  const submit = async (event) => {
      event.preventDefault()
      if(count !== 0 && counter !== 0 && from !== '' && to !== '') {
        await addDoc(collection(dbservice, 'num'), {
            point: 0,
            displayName: userObj.displayName,
            text: {choose: choose, count: count, counting: roomList[count-1], counter: counter, clock: from, clocker: to},
            creatorClock: Date.now(),
            creatorId: userObj.uid,
        })
        setChoose(0)
        setCount(0)
        setCounter(0)
      } else {
          alert('Choose Number')
      }
  }

  const onClick = (num) => {
    {isLoggedIn && setChoose(num)}
    {!isLoggedIn && setMove(true)}
  }
//   const noticeBorrowOnClick = (boolean) => setChoose(boolean)
  const onChangeFrom = (event) => {
    console.log(event)
    setFrom({year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
  }
  const onChangeTo = (event) => {
    setTo({year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
  }
  const handleClose = () => {
    setMove(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosing = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const roomOne = Array(181).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFocus = Array(46).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomTwo = Array(315).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomThree = Array(156).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFour = Array(149).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)

  return (
    <div className='d-flex flex-column'>
        <div className='d-flex justify-content-center btn-group btn-group-toggle'>
            {choose === 0 && 
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => onClick(1)}>Would like to Borrow</button>
                    <button className='btn btn-outline-primary' onClick={() => onClick(2)}>Would like to Lend</button>
                    <Dialog
                        open={move}
                        onClose={handleClose}
                    >
                        <DialogContent>
                            Need to login
                        </DialogContent>
                        <DialogActions>
                        <Link to='/newbasing/sign' className='btn btn-outline-primary' onClick={handleClose}>Login</Link>
                        <button className='btn btn-outline-primary' onClick={handleClose} autoFocus>
                            Disagree
                        </button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            {choose === 1 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(1)}>Would like to Borrow</button>
                    <button className='btn btn-outline-primary' onClick={() => onClick(2)}>Would like to Lend</button>
                </div>
            }
            {choose === 2 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => onClick(1)}>Would like to Borrow</button>  
                    <button className='btn btn-outline-primary active' onClick={() => onClick(2)}>Would like to Lend</button>  
                </div>
            }
        </div>
        {choose !== 0 &&
            <div>
                <div>Where</div>
                <div className='d-flex justify-content-center router'>
                    <select className='form-control' form='selection' defaultValue={0} onChange={changeRoom}>
                        <option value={0} disabled>study room number</option>
                        <option value={1}>one</option>
                        <option value={5}>focus</option>
                        <option value={2}>two</option>
                        <option value={3}>three</option>
                        <option value={4}>four</option>
                    </select>
                    <select className='form-control' form='selection' defaultValue={0} onChange={changeSeat}>  
                        <option value={0} disabled>seat number</option>
                        {count == 1 && roomOne}
                        {count == 5 && roomFocus}
                        {count == 2 && roomTwo}
                        {count == 3 && roomThree}
                        {count == 4 && roomFour}
                    </select>
                </div>
                <div>When</div>
                <div className='d-flex justify-content-center'>
                    <div className='p-3'>from</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Basic date time picker" onChange={onChangeFrom}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <div className='p-3'>to</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Basic date time picker" onChange={onChangeTo}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className='d-flex justify-content-center'>
                    <Rating
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <div>
                        {choose === 1 && <span>points you will provide: </span>}
                        {choose === 2 && <span>points you want to receive: </span>}
                        <span>{value} </span>
                        <img src={path} aria-describedby={id} onClick={handleClick}/>
                    </div>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosing}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        >
                        {choose === 1 && <div>You can award the user who helped you.</div>}
                        {choose === 2 && <div>You will be awarded by the user you helped.</div>}
                    </Popover>
                </div>
            </div>
        }
        {choose !== 0 &&
            <div className='d-flex justify-content-center'>
                <form id='selection' onSubmit={submit}>
                    <input className='btn btn-outline-primary' type='submit' value='submit'/>
                </form>
                <button className='btn btn-outline-primary' onClick={() => onClick(0)}>cancel</button>
            </div>
        }
    </div>  
  )
}

export default Add
