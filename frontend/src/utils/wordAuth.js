
import axios from 'axios'

const API_URL = '/api/words/'
const token = JSON.parse(localStorage.getItem('user')).token

// Create new goal
export const createWord = async (word) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, word, config)

  return response.data
}

// Get user goals
export const getWords = async (url) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(url, config)

  return response.data
}
