
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect,useState } from "react"
import {Link} from 'react-router-dom'
import WordHeader from "../components/WordHeader"
import {getDays} from '../utils/dayAuth'


function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  const [days, setDays] = useState([])

  useEffect(()=> {
    if(!user) {
      navigate('/login')
    }

    async function fetchDayList() {
      const response = await getDays()
      console.log(response)
      setDays(response)
    }

    fetchDayList();

  },[user])

  return (
   <>
    <section className='heading'>
      <h1 style={{fontSize: '2.5rem', position:'relative', top:'-50px', left:'-305px'}}>
        Welcome {user && user.name}
      </h1>
    </section>
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

export default Dashboard