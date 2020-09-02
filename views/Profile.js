import React, {useContext} from 'react'
import {StatusBar} from 'expo-status-bar'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
} from 'react-native'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import {FormContext} from '../contexts/FormContext'

const Profile = (props) => {
  const [state, setState] = useContext(AuthContext)

  // console.log('username', formValues.fullname)
  const logout = async () => {
    await AsyncStorage.clear()

    setState((state) => ({...state, isLoggedIn: false}))
    if (!state.isLoggedIn) {
      props.navigation.navigate('Login')
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{state.user.username}</Text>
      <Text>{state.user.full_name}</Text>
      <Text>{state.user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
})

Profile.propTypes = {
  navigation: PropTypes.object,
}

export default Profile
