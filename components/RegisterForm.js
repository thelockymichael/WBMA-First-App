import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native'

import useSignUpForm from '../hooks/RegisterHooks'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from './FormTextInput'
import {postSignUp} from '../hooks/APIhooks'

const Register = (props) => {
  const {
    inputs,
    handleInputChange,
  } = useSignUpForm()

  const [state, setState] = useContext(AuthContext)

  const register = async () => {
    try {
      const userData = await postSignUp({
        username: inputs.username,
        password: inputs.password,
        full_name: inputs.full_name,
        email: inputs.email,
      })
      console.log('user login:', userData)
      setState((state) => ({
        ...state,
        isLoggedIn: true,
        user: userData.user,
      }))
      await AsyncStorage.setItem('userToken', userData)

      console.log('userData', userData)
    } catch (err) {
      console.log('login error', err.message)
    }
  }

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userData')

    console.log('token', userToken)

    const response = await fetch(
      'http://media.mw.metropolia.fi/wbma/users/user',
      {
        headers: {
          'x-access-token': userToken,
        },
        method: 'GET',
      })


    console.log('response ok', response.ok)

    console.log('Propus', props.navigation)
    if (response.ok) {
      setState((state) => ({...state, isLoggedIn: true}))
    }
  }
  useEffect(() => {
    getToken()
  }, [])


  return (
    <View style={[styles.card, styles.authContainer]}>
      <Text>Register</Text>
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
          secureTextEntry
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="email"
          onChangeText={(txt) => handleInputChange('email', txt)}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="full name"
          onChangeText={(txt) => handleInputChange('full_name', txt)}
        />
        <Button
          title="Register!"
          onPress={register}
        />

        {/*         <FormTextInput
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
        <FormTextInput
          autoCapitalize="none"
          placeholder="email"
          value={inputs.email}
          keyboardType="email-address"
          onChangeText={handleEmailChange}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="full name"
          value={inputs.full_name}
          onChangeText={handleFullnameChange}
        /> */}

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

Register.propTypes = {
  navigation: PropTypes.object,
}

export default Register
