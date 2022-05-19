import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import WordHeader from './WordHeader'
import { createWord} from '../utils/wordAuth'
import {getDays} from '../utils/dayAuth'


function CreateWord() {
    const [isLoading, setIsLoading] = useState(false)
    const engRef = useRef(null)
    const korRef = useRef(null)
    const dayRef = useRef(null)

    const navigation = useNavigate()
    const [days, setDays] = useState([])
    async function fetchDayList() {
        const response = await getDays()
        setDays(response)
      }

  useEffect(()=> {
    fetchDayList();
  },[])

  async function onSubmit(e) {
      e.preventDefault();
      if(!isLoading) {
        setIsLoading(true)
        const data = await createWord({
          day:dayRef.current.value,
          eng:engRef.current.value,
          kor:korRef.current.value,
          isDone: false,
        })
        alert('생성완료')
        navigation(`/day/${dayRef.current.value}`)
        setIsLoading(false)
      }
  }

  return (
    <>
    <WordHeader/>
    <form onSubmit={onSubmit}>
        <div className='input_area'>
            <label>English</label>
            <input type="text" placeholder='Squirrel' ref={engRef}/>
        </div>
        <div className='input_area'>
            <label>Korean</label>
            <input type="text" placeholder='다람쥐' ref={korRef}/>
        </div>
        <div className='input_area'>
            <label>Day</label>
            <select ref={dayRef}>
                {days && days.map(day => (
                    <option key = {day._id} value = {day.day}>
                        {day.day}
                    </option>
                ))} 
            </select>
        </div>
        <button style={{
          opacity: isLoading ? 0.3 : 1
        }}>
            {isLoading ? 'Loading..' : '저장'}
        </button>
    </form>
    </>
  )
}

export default CreateWord