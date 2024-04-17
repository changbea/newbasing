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
  const [editing, setEditing] = useState(false)
  const [move, setMove] = useState(false)

  const onEditClick = () => {
    setEditing((prev) => !prev)
  }
  const onDeleteClick = async () => {
    const data = await doc(dbservice, `num/${msgObj.id}`)
    deleteDoc(data)
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setCounter(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    const data = await doc(dbservice, `num/${msgObj.id}`)
    updateDoc(data, {text: {
      count: count,
      counter: counter,}
    });
    setEditing(false)
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
    // if (msgObj.connectedId !== null) {
    // onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
    //     const element = snapshot.data().points
    //     setValue(element)
    //   })
    // }
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
          <div className='d-flex justify-content-center'>User: {msgObj.displayName}</div>
          <div className='d-flex justify-content-center'>Points: {msgObj.point}</div>
          <div className='d-flex justify-content-center'>Study Room Number: {msgObj.text.counting}</div>
          <div className='d-flex justify-content-center'>Seat Number: {msgObj.text.counter}</div>
          <div className='d-flex justify-content-center'>From: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
          <div className='d-flex justify-content-center'>To: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
          {msgObj.text.choose == 1 &&
            <div className='d-flex justify-content-center'>Borrowing</div>
          }
          {msgObj.text.choose == 2 &&
            <div className='d-flex justify-content-center'>Lending</div>
          }
          <div className='d-flex justify-content-center'>Status: {msgObj.round}</div>
          <div className='d-flex justify-content-center'>ConnectedUser: {msgObj.connectedId}</div>
          <div className='d-flex justify-content-center'>ConnectedProfile: {msgObj.connectedName}</div>
          {isOwner &&
            <div className='d-flex'>
              <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onDeleteClick}>Remove</button>
              {msgObj.round === 2 &&
                <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirm({userObj, msgObj})}>Confirm</button>
              }
              {msgObj.round === 3 &&
                <div>
                  {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirming({userObj, msgObj})}>Return</button>}
                  {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.connectedName} is borrowing</button>}
                </div>
              }
              {msgObj.round === 4 &&
                <div>
                  {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>Confirming the owner</button>}
                  {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onClick}>Confirm Return</button>}
                </div>
              }
            </div>
          }
          {!isOwner &&
            <div>
              <div>{msgObj.round}</div>
              {msgObj.round === 1 &&
                <div>
                  <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => support(userObj, msgObj, isLoggedIn)}>help</button>
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
              {msgObj.round === 2 && 
                <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => supporting({userObj, msgObj, isLoggedIn})}>helping</button>
              }
              {msgObj.round === 3 &&
                <div>
                  {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.displayName} is borrowing</button>}
                  {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => confirming({userObj, msgObj, isLoggedIn})}>Return</button>}
                </div>
              }
              {msgObj.round === 4 &&
                <div>
                  {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onClick}>Confirm Return</button>}
                  {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>Confirming the owner</button>}
                </div>
              }
            </div>  
          }
        </div>
    </div>
  )
}

export default Message
