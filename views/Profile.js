import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {StyleSheet, View, Text, SafeAreaView} from 'react-native'


const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <StatusBar style="auto" />
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

export default Profile
