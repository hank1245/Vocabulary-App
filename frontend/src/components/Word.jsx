import axios from 'axios'
import {useState} from 'react'

function Word({word : w}) {
    const [word,setWord] = useState(w)
    const [isDone, setIsDone] = useState(word.isDone)
    const [isShow, setIsShow] = useState(false)

    async function toggleDone() {
        await axios.put(`/api/words/${word._id}`,{
            ...word,
            isDone: !isDone
        })
        setIsDone(!isDone)

    }
    function toggleShow() {
        setIsShow(!isShow)
    }
    async function del() {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            await axios.delete(`/api/words/${word._id}`)
            
            setWord({
                ...word,
                id: 0
            })
        }

    }

    if(word.id === 0) {
        return null
    }

  return (
    <tr style={{
        opacity: isDone ? 0.3 : 1
      }}>
        <td>
            <input type='checkbox' checked={isDone} onChange={toggleDone}/>
        </td>
        <td>
            {word.eng}
        </td>
        <td>
            {isShow && word.kor}
        </td>
        <td className='word_button'>
            <button onClick = {toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
            <button className='btn_del' onClick={del}>삭제</button>
        </td>
    </tr>
  )
}

export default Word