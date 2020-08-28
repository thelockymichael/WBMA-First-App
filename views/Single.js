

import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  SafeAreaView,
} from 'react-native'

import Urls from '../constants/urls'
import Colors from '../constants/colors'

import PropTypes from 'prop-types'

const Single = ({route}) => {
  const {singleMedia} = route.params

  console.log('route filename', singleMedia.filename)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{singleMedia.title}</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: Urls.uploads + singleMedia.filename,
          }} />
      </View>

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
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: Colors.primary,
    marginBottom: 20,

  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    borderRadius: (Dimensions.get('window').width * 1.1) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

Single.propTypes = {
  route: PropTypes.object,

}
export default Single
