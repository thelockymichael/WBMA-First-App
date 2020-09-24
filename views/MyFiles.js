import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native'

import {
  Button,
  Icon,
} from 'native-base'


import {useMyMedia} from '../hooks/APIhooks'
import PropTypes from 'prop-types'

const MyFiles = ({navigation}) => {
  const {mediaArray, isRefreshing, loadMedia} = useMyMedia()

  console.log('mediaArraynus', mediaArray)

  return (
    <SafeAreaView>
      <List
        navigation={navigation}
        mediaArray={mediaArray}
        isRefreshing={isRefreshing}
        loadMedia={loadMedia}
        enableUserButtons={true}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

List.propTypes = {
  navigation: PropTypes.object,
}

export default MyFiles
