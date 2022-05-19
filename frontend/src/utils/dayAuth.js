
import axios from 'axios'

const API_URL = '/api/days/'
const token = JSON.parse(localStorage.getItem('user')).token

// Create new goal
export const createDay = async (day) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, {day}, config)

  return response.data
}

// Get user goals
export const getDays = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
export const deleteDay = async (dayId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + dayId, config)

  return response.data
}

export const getOneDay = async (day) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + day, config)

  return response.data
}