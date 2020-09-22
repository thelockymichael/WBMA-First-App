

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
  Container,
  Content,
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

  const favouriteFile = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')

      console.log('LIKED!')

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({
          file_id: singleMedia.file_id,
        }),
      }
      console.log('singleMedia.file_id', singleMedia.file_id)
      const response = await fetch(
        apiUrl + 'favourites',
        options,
      )

      const json = await response.text()

      console.log('JASON !', json)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Container>
      <Content>
        <Card style={{flex: 0}}>
          <CardItem cardBody>
            <Image source={{
              uri: Urls.apiUrl + 'uploads/' + singleMedia.filename,
            }}
              style={{
                height: 400,
                width: null,
                flex: 1,
              }}
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
          <CardItem>
            <Left>
              <Button
                onPress={favouriteFile}
                transparent
                textStyle={{color: '#87838B'}}>
                <Icon name="md-heart-empty" />
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}
{/* md-heart-empty */}

Single.propTypes = {
  route: PropTypes.object,

}
export default Single
