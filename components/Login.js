import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native'

import userLoginForm from '../hooks/loginFormHandler'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from '../components/FormTextInput'
import {postLogIn, checkToken} from '../hooks/APIhooks'
import SignUp from '../components/SignUp'

const Login = (props) => {
  const {inputs, handleUsernameChange, handlePasswordChange} = userLoginForm()

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
        console.log('token valid 222', userData)

        setState((state) => ({...state, isLoggedIn: true, user: userData}))


        console.log('MA BOIZ', state.isLoggedIn)
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
          value={inputs.username}
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry={true}
          value={inputs.password}
          onChangeText={handlePasswordChange}
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
