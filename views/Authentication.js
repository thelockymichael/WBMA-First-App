import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from 'react-native'


import PropTypes from 'prop-types'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import FormTextInput from '../components/FormTextInput'

import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

const Authentication = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
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

})

Authentication.propTypes = {
  navigation: PropTypes.object,
}

export default Authentication
