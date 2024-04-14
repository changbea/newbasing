import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

function Message({ msgObj, isOwner, userObj }) {
  const [editing, setEditing] = useState(false)
  const [count, setCount] = useState(msgObj.text.count)
  const [counter, setCounter] = useState(msgObj.text.counter)

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

  return (
    <div className='border border-primary'>
      {editing ?
        <div>
          <form className='d-flex flex-column justify-content-center' onSubmit={onSubmit}>
            <input className='d-flex justify-content-center form-control' placeholder={counter} type='number' onChange={onChange} min='1' max='315' />
            <div className='d-flex justify-content-center'>
              <input className='btn btn-outline-primary' type='submit' value='done' />
              <button className='btn btn-outline-primary' onClick={onEditClick}>cancel</button>
            </div>
          </form>
        </div>
        :
        <div>  
          <div className='d-flex justify-content-center'>User: {msgObj.displayName}</div>
          <div className='d-flex justify-content-center'>Study Room Number: {msgObj.text.counting}</div>
          <div className='d-flex justify-content-center'>Seat Number: {msgObj.text.counter}</div>
          <div className='d-flex justify-content-center'>From: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
          <div className='d-flex justify-content-center'>To: {msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
          {isOwner &&
            // <div className='d-flex justify-content-center'>
            //   <button className='btn btn-outline-primary' onClick={onEditClick}>Edit Seat</button>
            <button className='d-flex justify-content-center btn btn-outline-primary' onClick={onDeleteClick}>Remove</button>
            // </div>
          }
          {!isOwner &&
            <button className='d-flex justify-content-center btn btn-outline-primary'>help</button>
          }
        </div>
      }
    </div>
  )
}

export default Message
