import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native'

import userSignUpForm from '../hooks/LoginHook'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from '../components/FormTextInput'

const Login = (props) => {
  const {inputs, handleUsernameChange, handlePasswordChange} = userSignUpForm()

  const [state, setState] = useContext(AuthContext)


  const postFetch = async (username, password) => {
    const body = JSON.stringify({
      username,
      password,
    })
    const response = await fetch(
      'http://media.mw.metropolia.fi/wbma/login',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      })
    const responseJson = await response.json()
    console.log('response', responseJson)

    return responseJson
  }

  const logIn = async () => {
    const response = await postFetch(
      inputs.username,
      inputs.password,
    )

    if (response.token === undefined) {
      Alert.alert(
        'Login failed',
        response.message,
        [{text: 'Okay'}],
      )
      return
    }
    await AsyncStorage.setItem('userToken', response.token)
    setState((state) => ({
      ...state,
      isLoggedIn: true,
      user: response.user,
    }))

    if (state.isLoggedIn) {
      props.navigation.navigate('Home')
    }
  }

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    console.log('token', userToken)

    const response = await fetch(
      'http://media.mw.metropolia.fi/wbma/users/user',
      {
        headers: {
          'x-access-token': userToken,
        },
        method: 'GET',
      })

    // console.log('response status', response)
    // console.log('response ok', response.ok)

    console.log('response ok', response.ok)
    if (response.ok) {
      setState((state) => ({...state, isLoggedIn: true}))
      props.navigation.navigate('Home')
    }
  }
  useEffect(() => {
    getToken()
  }, [])

  return (
    <View style={styles.container}>
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
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

Login.propTypes = {
  navigation: PropTypes.object,
}

export default Login
