/* eslint-disable react/display-name */
import React, {useState, useEffect} from 'react'

import {
  Image,
  Text,
} from 'react-native'
import {Video} from 'expo-av'
import Urls from '../constants/urls'

import PropTypes from 'prop-types'

import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons'

import {
  Card,
  CardItem,
  Left,
  Title,
  Icon,
  Container,
  Content,
} from 'native-base'

import * as ScreenOrientation from 'expo-screen-orientation'

import CustomHeaderButton from '../components/HeaderButton'

const Single = ({navigation, route}) => {
  const [error, setError] = useState(false)
  const [videoRef, setVideoRef] = useState(null)
  const {singleMedia} = route.params

  const handleVideoRef = (component) => {
    setVideoRef(component)
  }

  const showVideoInFullScreen = async () => {
    try {
      await videoRef.presentFullscreenPlayer()
    } catch (err) {
      console.log('svifs error', err.message)
    }
  }


  const unlock = async () => {
    await ScreenOrientation.unlockAsync()
  }

  const lock = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    )
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={CustomHeaderButton}
        >
          <Item
            title="search"
            iconName="ios-heart"
            onPress={() => {
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  useEffect(() => {
    unlock()

    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        console.log('orientation', evt)
        if (evt.orientationInfo.orientation > 2) {
          showVideoInFullScreen()
        }
      },
    )

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub)
      lock()
    }
  }, [videoRef])

  return (
    <Container>
      <Content>
        <Card style={{flex: 0}}>
          <CardItem cardBody>
            {singleMedia.media_type === 'image' ?
              <Image source={{
                uri: Urls.apiUrl + 'uploads/' + singleMedia.filename,
              }}
              style={{
                height: 400,
                width: null,
                flex: 1,
              }}
              /> :
              <Video
                ref={handleVideoRef}
                source={{
                  uri:
                    error ? 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' :
                      Urls.apiUrl + 'uploads/' + singleMedia.filename,
                }}
                style={{
                  height: 400,
                  width: null,
                  flex: 1,
                }}
                useNativeControls={true}
                onError={(err) => {
                  console.log('video error', err)
                  setError(true)
                }}
              />
            }
          </CardItem>
          <CardItem>
            <Left>
              <Icon name={'camera'} />
              <Title>{singleMedia.title}</Title>
            </Left>
          </CardItem>

          <CardItem style={{flexDirection: 'column'}}>
            <Text>
              {singleMedia.description}
            </Text>
            <Text>User: {singleMedia.username}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
}
export default Single
