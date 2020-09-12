import React, {useState, useContext} from 'react'
import {Button, Text, Form} from 'native-base'

import useSignUpForm from '../hooks/RegisterHooks'

import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from './FormTextInput'
import {postSignUp, checkAvailable} from '../hooks/APIhooks'

const Register = (props) => {
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    registerErrors,
    validateOnSend,
    checkUserAvailable,
  } = useSignUpForm()

  const {setUser, setIsLoggedIn} = useContext(AuthContext)


  const register = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed!')
      return
    }
    try {
      const userData = await postSignUp({
        username: inputs.username,
        password: inputs.password,
        full_name: inputs.full_name,
        email: inputs.email,
      })
      console.log('user login:', userData)
      await AsyncStorage.setItem('userToken', userData.token)
      setIsLoggedIn(true)
      setUser(userData.user)
      console.log('userData', userData)
    } catch (err) {
      console.log('login error', err.message)
    }
  }

  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          checkUserAvailable(event)
          handleInputEnd('username', event)
        }} // error={usernameAvailable}
        error={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(event) => handleInputEnd('password', event)}
        secureTextEntry
        error={registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        onEndEditing={(event) => handleInputEnd('confirmPassword', event)}
        secureTextEntry
        error={registerErrors.confirmPassword}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => handleInputEnd('email', event)}
        error={registerErrors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => handleInputEnd('full_name', event)}
        error={registerErrors.full_name}
      />
      <Button block onPress={register}>
        <Text>Register!</Text>
      </Button>
    </Form>
  )
}

Register.propTypes = {
  navigation: PropTypes.object,
}

export default Register
