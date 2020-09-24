import React, {useContext} from 'react'


import {Button, Text, Form} from 'native-base'

import useLoginForm from '../hooks/LoginHooks'

import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from './FormTextInput'
import {postLogIn} from '../hooks/APIhooks'

const Login = (props) => {
  const {
    inputs,
    handleInputChange,
    loginErrors,
    validateOnSend,
  } = useLoginForm()

  const {setIsLoggedIn, setUser} = useContext(AuthContext)

  const logIn = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed')
      return
    }
    try {
      const userData = await postLogIn({
        username: inputs.username,
        password: inputs.password,
      })
      console.log('user login:', userData)
      setIsLoggedIn(true)
      setUser(userData.user)
      await AsyncStorage.setItem('userToken', userData.token)

      console.log('userData', userData)
    } catch (err) {
      console.log('login error', err.message)
    }
  }

  return (
    <Form>
      <FormTextInput
        inputLabel="Username"
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        error={loginErrors.username}
      />
      <FormTextInput
        inputLabel="Password"
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        error={loginErrors.password}
      />
      <Button block onPress={logIn}>
        <Text>Login!</Text>
      </Button>
    </Form>
  )
}


export default Login
