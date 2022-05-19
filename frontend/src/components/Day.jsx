import { useParams } from "react-router-dom"
import { useState,useEffect } from 'react'
import axios from "axios";
import Word from "./Word";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import WordHeader from "./WordHeader";
import {getWords} from '../utils/wordAuth'
import {getDays} from '../utils/dayAuth'

function Day() {
  const params = useParams();
  const [day, setDay] = useState(params.day)

  const [words, setWords] = useState([])
  const fetchWords =  async function() {
      const response = await getWords(`/api/words?day=${day}`)
      setWords(response)
  }

  useEffect(()=> {
    fetchWords();
  },[day])

//   async function prevDay() {
//     const response = await axios.get(`http://localhost:5500/words?day=${day > 1 ? setDay(day-1) : day}`)
//     setWords(response.data)
// }
  
  return (
    <>
    <WordHeader/>
    <div className="day_shift">
      <FaArrowLeft className='click_effect' onClick={() => {
        if(day > 1) {
          setDay(day-1)
        }
      }}/> Day {day} <FaArrowRight className='click_effect' onClick={ async () => {
        const days = await getDays()
        if(days.length > day ) {
          setDay(Number(day)+1)
        }
      }
    }/>
    </div>
      <table>
        <tbody>
            {words.length >=1 ? words.map(word => (
              <Word word={word} key={word._id}/>
            )) : (<span>아직 추가된 단어가 없습니다!</span>)}
        </tbody>
      </table>
    </>
  )
}

export default Day