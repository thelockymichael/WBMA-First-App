import React, {useState} from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View, TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import Urls from '../constants/urls'
import Colors from '../constants/colors'

import AsyncImage from './AsyncImage'

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Single',
        {singleMedia})}
    >
      <View style={styles.gridItem}>
        <View style={styles.imageBox}>
          <AsyncImage
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
            }}
            source={{uri: Urls.uploads + singleMedia.filename}}
            placeHolderColor="#b3e5fc"
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  textBox: {
    padding: 10,
    flexDirection: 'column',
    width: '60%%',
  },
  titleText: {
    fontSize: 24,
    color: Colors.primary,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
})

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
}

export default ListItem
