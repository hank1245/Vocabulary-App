import axios from 'axios'
import {Link} from 'react-router-dom'
import {getDays, deleteDay, getOneDay} from '../utils/dayAuth'

function WordHeader() {

  async function delete_day() {
    const days = getDays()
    const dayLength = (await days).length
    const response = await getOneDay(dayLength)
    console.log(response)
    const dayId = response[0]._id
    if(window.confirm(`Day ${dayLength}을 삭제하시겠습니까?`)){
      deleteDay(dayId)
      window.location.reload()
    }
  }
  return (
   <>
    <div className='wordheader'>
        <div className="menu">
            <Link to='/create_word' className='link click_effect' >단어 추가</Link>
            <Link to='/create_day' className='link click_effect'>Day 추가</Link>
            <Link to='#'className='link click_effect del_btn' onClick={delete_day}>Day 삭제</Link>
        </div>
    </div>
   </>
  )
}

export default WordHeader