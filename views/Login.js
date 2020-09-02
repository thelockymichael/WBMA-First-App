import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from '../components/FormTextInput'

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext)
  console.log('ili', isLoggedIn)

  const postFetch = async () => {
    const body = JSON.stringify({
      username: 'mihael',
      password: 'Mihael321',
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
    const response = await postFetch()
    if (response.token !== undefined) {
      await AsyncStorage.setItem('userToken', response.token)
      setIsLoggedIn(true)

      if (isLoggedIn) {
        props.navigation.navigate('Home')
      }
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
      setIsLoggedIn(true)
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
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
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
