import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Spinner,
} from 'react-native'

import {useMyMedia} from '../hooks/APIhooks'
import PropTypes from 'prop-types'

const MyFiles = ({navigation}) => {
  const {mediaArray, isRefreshing, loadMedia} = useMyMedia()

  console.log('mediaArraynus', mediaArray)

  return (


    mediaArray.length !== 0 ? <SafeAreaView>
      <List
        navigation={navigation}
        mediaArray={mediaArray}
        isRefreshing={isRefreshing}
        loadMedia={loadMedia}
      />
      <StatusBar style="auto" />
    </SafeAreaView> : <Text>
        Nothing to see here.
    </Text>
  )
}

List.propTypes = {
  navigation: PropTypes.object,
}

export default MyFiles
