import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import '@mantine/dropzone/styles.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
//   const [round, setRound] = useState(1)

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
            point: value,
            displayName: userObj.displayName,
            text: {choose: choose, count: count, counting: roomList[count-1], counter: counter, clock: from, clocker: to},
            round: 1,
            creatorClock: Date.now(),
            creatorId: userObj.uid,
            connectedId: null,
            connectedName: null,
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
                    <button className='btn btn-outline-primary' onClick={() => onClick(1)}>빌릴래요</button>
                    <button className='btn btn-outline-primary' onClick={() => onClick(2)}>빌려줄래요</button>
                    <Dialog
                        open={move}
                        onClose={handleClose}
                    >
                        <DialogContent>
                            로그인이 필요합니다
                        </DialogContent>
                        <DialogActions>
                        <Link to='/newbasing/sign' className='btn btn-outline-primary' onClick={handleClose}>로그인/회원가입 페이지</Link>
                        <button className='btn btn-outline-primary' onClick={handleClose} autoFocus>
                            닫기
                        </button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            {choose === 1 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(1)}>빌릴래요</button>
                    <button className='btn btn-outline-primary' onClick={() => onClick(2)}>빌려줄래요</button>
                </div>
            }
            {choose === 2 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => onClick(1)}>빌릴래요</button>  
                    <button className='btn btn-outline-primary active' onClick={() => onClick(2)}>빌려줄래요</button>  
                </div>
            }
        </div>
        {choose !== 0 &&
            <div>
                <div>위치가 어디인가요</div>
                <div className='d-flex justify-content-center router'>
                    <select className='form-control' form='selection' defaultValue={0} onChange={changeRoom}>
                        <option value={0} disabled>열람실을 알려주세요</option>
                        <option value={1}>one</option>
                        <option value={5}>focus</option>
                        <option value={2}>two</option>
                        <option value={3}>three</option>
                        <option value={4}>four</option>
                    </select>
                    <select className='form-control' form='selection' defaultValue={0} onChange={changeSeat}>  
                        <option value={0} disabled>좌석을 알려주세요</option>
                        {count == 1 && roomOne}
                        {count == 5 && roomFocus}
                        {count == 2 && roomTwo}
                        {count == 3 && roomThree}
                        {count == 4 && roomFour}
                    </select>
                </div>
                <div>언제부터 언제까지인가요</div>
                <div className='d-flex justify-content-center'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="이 때부터" onChange={onChangeFrom}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="이 때까지" onChange={onChangeTo}/>
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
                        {choose === 1 && <span>몇 포인트에 빌리시겠어요: </span>}
                        {choose === 2 && <span>몇 포인트에 빌려주시겠어요: </span>}
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
                        {choose === 1 && <div>빌려준 유저에게 포인트를 제공할 수 있어요.</div>}
                        {choose === 2 && <div>빌려받은 유저로부터 포인트를 제공받을 수 있어요.</div>}
                    </Popover>
                </div>
            </div>
        }
        {choose !== 0 &&
            <div className='d-flex justify-content-center'>
                <form id='selection' onSubmit={submit}>
                    <input className='btn btn-outline-primary' type='submit' value='등록하기'/>
                </form>
                <button className='btn btn-outline-primary' onClick={() => onClick(0)}>취소하기</button>
            </div>
        }
    </div>  
  )
}

export default Add
