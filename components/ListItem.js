import React, {useState} from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import PropTypes from 'prop-types'

import Urls from '../constants/urls'
import Colors from '../constants/colors'

import AsyncImage from './AsyncImage'
import {
  ListItem as NBListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Icon,
} from 'native-base'


const ListItem = ({singleMedia, navigation}) => {
  return (
    <NBListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: Urls.uploads + singleMedia.filename}} />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>{singleMedia.description}</Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Single',
              {singleMedia})
          }}
        >
          <Icon name={'eye'}></Icon>
          <Text>View</Text>
        </Button>
      </Right>
    </NBListItem>
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
