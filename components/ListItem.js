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


const ListItem = ({singleMedia, navigation, ...props}) => {
  return (
    <NBListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: Urls.apiUrl + 'uploads/' + singleMedia.filename}} />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>{singleMedia.description}</Text>
      </Body>
      <Right style={{padding: 0, margin: 0, flexDirection: 'row'}}>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Single',
              {singleMedia})
          }}
        >
          <Icon name={'eye'}></Icon>
        </Button>
        {props.children}
      </Right>
    </NBListItem>
  )
}

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
}

export default ListItem
