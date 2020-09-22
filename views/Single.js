

import React from 'react'
import {StatusBar} from 'expo-status-bar'
import AsyncStorage from '@react-native-community/async-storage'

const apiUrl = 'http://media.mw.metropolia.fi/wbma/'

import {
  Image,
  Text,
} from 'react-native'
import {Video} from 'expo-av'
import Urls from '../constants/urls'
import Colors from '../constants/colors'

import PropTypes from 'prop-types'

import {
  Card,
  CardItem,
  Left,
  Title,
  Icon,
  Button,
} from 'native-base'

const Single = ({route}) => {
  const {singleMedia} = route.params


  /* <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={{ width: 300, height: 300 }}
/> */

  return (
    <Card>
      <CardItem cardBody>
        <Image source={{uri: Urls.apiUrl + 'uploads/' + singleMedia.filename}}
          style={{height: 400, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Icon name={'camera'} />
          <Title>{singleMedia.title}</Title>
        </Left>
      </CardItem>

      <CardItem>
        <Text>
          {singleMedia.description}
        </Text>

      </CardItem>
      <CardItem>
        <Text>User: {singleMedia.username}</Text>
      </CardItem>
    </Card>
  )
}

Single.propTypes = {
  route: PropTypes.object,

}
export default Single
