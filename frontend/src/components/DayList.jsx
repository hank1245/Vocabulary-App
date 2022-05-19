import { useEffect,useState } from "react"
import axios from 'axios'
import {Link} from 'react-router-dom'
import WordHeader from "./WordHeader"
import {getDays} from '../utils/dayAuth'


function DayList() {
  const [days, setDays] = useState([])

  useEffect(()=> {
    async function fetchDayList() {
      const response = await getDays()
      console.log(response)
      setDays(response)
    }
    fetchDayList();
  },[])

  return (
    <>
    <WordHeader/>
    <ul className="list_day">
        {days && days.map(day => (
          <li key={day._id}>
            <Link to={`/day/${day.day}`} className='click_effect'>Day {day.day}</Link>
          </li>
        ))}
    </ul>
    </>
  )
}

export default DayList