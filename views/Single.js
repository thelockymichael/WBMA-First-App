

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

import {
  Card,
  CardItem,
  Left,
  Title,
  Icon,
} from 'native-base'

const Single = ({route}) => {
  const {singleMedia} = route.params

  return (
    <Card>
      <CardItem cardBody>
        <Image source={{uri: Urls.uploads + singleMedia.filename}}
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
    </Card>
  )
}

Single.propTypes = {
  route: PropTypes.object,

}
export default Single
