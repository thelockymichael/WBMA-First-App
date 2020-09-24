import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {
  SafeAreaView,
} from 'react-native'

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

MyFiles.propTypes = {
  navigation: PropTypes.object,
}

export default MyFiles
