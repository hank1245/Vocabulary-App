import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import WordHeader from './WordHeader'
import { getDays, createDay } from '../utils/dayAuth'

function CreateDay() {
    const [days, setDays] = useState([])
    const navigation = useNavigate()

    async function fetchDayList() {
        const response = await getDays()
        console.log(response)
        setDays(response)
      }

  useEffect(()=> {
    fetchDayList()
  },[])

  async function addDay() {
    await createDay(days.length+1)
    alert('날짜 추가 완료!')
    navigation('/')
  }
  return (
    <>
      <WordHeader/>
      <h1>현재 Day 수: {days.length}</h1>
      <button onClick = {addDay} className='click_effect'>날짜 추가하기</button>
    </>
  )
}

export default CreateDay