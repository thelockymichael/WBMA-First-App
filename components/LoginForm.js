import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native'

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
    <View style={[styles.card, styles.authContainer]}>
      <Text>Login</Text>
      <View style={styles.form}>
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
        <View style={styles.buttonContainer}>
          <Button title="Sign in!" onPress={logIn} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
})

export default Login
