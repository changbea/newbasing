import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
// import support from './support'
import supporting from './supporting';
import confirm from './confirm';
import confirming from './confirming';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

function Message({ msgObj, isOwner, userObj, isLoggedIn }) {
  const [count, setCount] = useState(msgObj.text.count)
  const [counter, setCounter] = useState(msgObj.text.counter)
  const [num, setNum] = useState(null)
  const [value, setValue] = useState(null)
  const [move, setMove] = useState(false)
  
  const onDeleteClick = () => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    deleteDoc(data)
  }

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${msgObj.creatorId}`)), (snapshot) => {
        // const number = snapshot.docs.map((document) => ({
        //     ...document.data(),
        // }));
        const number = snapshot.data().points
        setNum(number)
      }
    )
  }, [])
  useEffect(() => {
    if (msgObj.connectedId !== null) {
    onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
        const element = snapshot.data().points
        setValue(element)
      })
    }
  })

  const onClick = () => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    updateDoc(data, {round: 5});
    const point = doc(dbservice, `members/${msgObj.creatorId}`)
    const connectedPoint = doc(dbservice, `members/${msgObj.connectedId}`)
    console.log(num)
    console.log(value)
    console.log(msgObj.point)
    if (msgObj.text.choose == 1) {
      updateDoc(point, {points: num-msgObj.point});
      updateDoc(connectedPoint, {points: value+msgObj.point});
    } else {
      updateDoc(point, {points: num+msgObj.point});
      updateDoc(connectedPoint, {points: value-msgObj.point});
    }
  }
  const handleClose = () => {
    setMove(false);
  };

  const support = () => {
    if (isLoggedIn) { 
      const data = doc(dbservice, `num/${msgObj.id}`)
      updateDoc(data, {round: 2, connectedId: userObj.uid, connectedName: userObj.displayName});
    } else {
      setMove(true)
    }
  }

  return (
    <div className='border border-primary'>
      <div>
        {msgObj.text.choose == 1 &&
          <div className='d-flex justify-content-center'>빌리기</div>
        }
        {msgObj.text.choose == 2 &&
          <div className='d-flex justify-content-center'>빌려주기</div>
        }
        <div className='d-flex justify-content-center'>요청 유저 이름: {msgObj.displayName}</div>
        <div className='d-flex justify-content-center'>포인트: {msgObj.point}</div>
        <div className='d-flex justify-content-center'>열람실의 위치: {msgObj.text.counting}</div>
        <div className='d-flex justify-content-center'>좌석의 위치: {msgObj.text.counter}</div>
        <div className='d-flex justify-content-center'>이 때부터: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
        <div className='d-flex justify-content-center'>이 때까지: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
        {/* <div className='d-flex justify-content-center'>ConnectedUser: {msgObj.connectedId}</div> */}
        <div className='d-flex justify-content-center'>승낙 유저 이름: {msgObj.connectedName}</div>
        <div className='d-flex justify-content-center'>진행 단계: {msgObj.round}</div>
        {isOwner &&
          <div className='d-flex justify-content-center'>
            {msgObj.round === 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onDeleteClick}>지우기</button>}
            {msgObj.round === 2 &&
              <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirm({userObj, msgObj})}>승낙 메시지 확인</button>
            }
            {msgObj.round === 3 &&
              <div className='d-flex justify-content-center'>
                {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirming({userObj, msgObj})}>반납하기</button>}
                {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.connectedName} 님이 빌리는 중</button>}
              </div>
            }
            {msgObj.round === 4 &&
              <div className='d-flex justify-content-center'>
                {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>주인에게 확인 중</button>}
                {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onClick}>반납 완료 확인</button>}
              </div>
            }
          </div>
        }
        {!isOwner &&
          <div>
            {msgObj.round === 1 &&
              <div className='d-flex justify-content-center'>
                <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => support(userObj, msgObj, isLoggedIn)}>승낙하기</button>
                <Dialog open={move} onClose={handleClose}>
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
            {msgObj.round === 2 &&
              <div className='d-flex justify-content-center'>
                <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => supporting({userObj, msgObj, isLoggedIn})}>승낙 메시지 전송 완료</button>
              </div>
            }
            {msgObj.round === 3 &&
              <div className='d-flex justify-content-center'>
                {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.displayName} 님이 빌리는 중</button>}
                {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirming({userObj, msgObj})}>반납하기</button>}
              </div>
            }
            {msgObj.round === 4 &&
              <div className='d-flex justify-content-center'>
                {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onClick}>반납 완료 확인</button>}
                {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>주인에게 확인 중</button>}
              </div>
            }
          </div>  
        }
      </div>
    </div>
  )
}

export default Message
