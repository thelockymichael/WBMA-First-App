import {useState, useEffect} from 'react'
import axios from 'axios'
import {tagName} from '../config/environment'

const apiUrl = 'http://media.mw.metropolia.fi/wbma/'

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadMedia = async () => {
    setIsRefreshing(true)
    try {
      console.log('ASDF', tagName)
      const response = await fetch(apiUrl + 'tags/' + tagName)
      const json = await response.json()

      setMediaArray(json)
    } catch (error) {
      throw new Error(error)
    }

    setIsRefreshing(false)
  }
  useEffect(() => {
    loadMedia()
  }, [])

  return {
    mediaArray,
    isRefreshing,
    loadMedia,
  }
}

const postLogIn = async (userCreds) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userCreds),
  }

  try {
    const response = await fetch(apiUrl + 'login', options)
    const userData = await response.json()
    if (response.ok) {
      return userData
    } else {
      throw new Error(userData.message)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const postSignUp = async (newUser) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser),
  }
  let response
  try {
    response = await fetch(apiUrl + 'users', options)

    response = await fetch(apiUrl + 'login', options)
    const userData = await response.json()
    if (response.ok) {
      return userData
    } else {
      throw new Error(userData.message)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const checkToken = async (token) => {
  const options = {
    method: 'GET',
    headers: {'x-access-token': token},
  }

  try {
    const response = await fetch(
      apiUrl + 'users/user', options,
    )
    const userData = await response.json()
    if (response.ok) {
      return userData
    } else {
      throw new Error(userData.message)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const getAvatar = async () => {
  try {
    const response = await fetch(`${apiUrl}tags/avatar_704`)
    const avatarImages = await response.json()
    if (response.ok) {
      return avatarImages
    } else {
      throw new Error(avatarImages.message)
    }
  } catch (error) {
    throw new Error(error)
  }
}

const checkAvailable = async (username) => {
  try {
    const response = await fetch(`${apiUrl}users/username/${username}`)
    const resultData = await response.json()
    console.log('resultData', resultData)
    if (response.ok) {
      if (resultData.available) {
        return null
      } else {
        return 'Username ' + username + ' is not available.'
      }
    } else {
      throw new Error(resultData.message)
    }
  } catch (error) {
    throw new Error(error)
  }
}

const upload = async (fd, token) => {
  let options = {
    method: 'POST',
    headers: {'x-access-token': token},
    data: fd,
    url: apiUrl + 'media',
  }

  try {
    let response = await axios(options)

    console.log('RESPONSE', response.data)
    console.log('RESPONSE file_id', response.data.file_id)

    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(
        {
          file_id: response.data.file_id,
          tag: tagName,
        },
      ),
    }

    response = await fetch(apiUrl + 'tags', options)

    console.log('RESETUS LUL', await response.json())

    return response.data
  } catch (e) {
    throw new Error(e.message)
  }
}


export {
  useLoadMedia,
  postLogIn,
  postSignUp,
  checkToken,
  getAvatar,
  checkAvailable,
  upload,
}

