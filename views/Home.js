import React from 'react'
import {StatusBar} from 'expo-status-bar'
import List from '../components/List'
import {SafeAreaView} from 'react-native'

import {useLoadMedia} from '../hooks/APIhooks'
import PropTypes from 'prop-types'

const Home = ({navigation}) => {
  const {mediaArray, isRefreshing, loadMedia} = useLoadMedia()

  return (
    <SafeAreaView>
      <List
        navigation={navigation}
        mediaArray={mediaArray}
        isRefreshing={isRefreshing}
        loadMedia={loadMedia}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

Home.propTypes = {
  navigation: PropTypes.object,
}

export default Home
