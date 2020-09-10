import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native'

import {Button, Text, Form} from 'native-base'

import useLoginForm from '../hooks/LoginHooks'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from './FormTextInput'
import {postLogIn, checkToken} from '../hooks/APIhooks'

const Login = (props) => {
  const {inputs, handleInputChange} = useLoginForm()

  const [state, setState] = useContext(AuthContext)

  const logIn = async () => {
    try {
      const userData = await postLogIn({
        username: inputs.username,
        password: inputs.password,
      })
      console.log('user login:', userData)
      setState((state) => ({
        ...state,
        isLoggedIn: true,
        user: userData.user,
      }))
      await AsyncStorage.setItem('userData', userData.token)


      console.log('userData', userData)
    } catch (err) {
      console.log('login error', err.message)
    }
  }

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userData')

    if (userToken) {
      try {
        const userData = await checkToken(userToken)

        setState((state) => ({...state, isLoggedIn: true, user: userData}))
      } catch (err) {
        console.log('token check failed', err.message)
      }
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button block onPress={logIn}>
        <Text>Login!</Text>
      </Button>
    </Form>
  )
}


export default Login
