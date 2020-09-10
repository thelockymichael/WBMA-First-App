const apiUrl = 'http://media.mw.metropolia.fi/wbma/'

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

const getAvatar = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}tags/avatar_${userId}`)
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

export {postLogIn, postSignUp, checkToken, getAvatar}

