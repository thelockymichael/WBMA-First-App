import React, {useEffect, useState} from 'react'
import FormTextInput from '../components/FormTextInput'
import Urls from '../constants/urls'
import PropTypes from 'prop-types'
import * as ScreenOrientation from 'expo-screen-orientation'

import {
  Image,
  Platform,
  Alert,
} from 'react-native'
import {
  Text,
  Form,
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Label,
  Spinner,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import useModifyHooks from '../hooks/ModifyHooks'
import {modifyItem} from '../hooks/APIhooks'
import AsyncStorage from '@react-native-community/async-storage'
import {upload} from '../hooks/APIhooks'
import {Video} from 'expo-av'

const Modify = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [videoRef, setVideoRef] = useState(null)

  const {singleMedia} = props.route.params

  console.log('singleMedia modify', singleMedia)


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

  const {
    handleInputChange,
    modifyErrors,
    inputs,
    canBeSubmitted,
    resetForm,
  } = useModifyHooks()

  return (
    <Container>
      <Content padder>
        <Label danger>Image *</Label>
        <Card>
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
        </Card>
        <Form>
          <FormTextInput
            inputLabel="Title *"
            autoCapitalize="none"
            placeholder="Title"
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={modifyErrors.title}
            value={inputs.title}
          />
          <FormTextInput
            inputLabel="Description"
            autoCapitalize="none"
            placeholder="Description"
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={modifyErrors.description}
            value={inputs.description}
          />
        </Form>
        {isLoading && <Spinner />}
        <Button block onPress={resetForm}>
          <Text>Reset Form</Text>
        </Button>
        <Button
          disabled={canBeSubmitted()}
          block
          onPress={async () => {
            const result = await modifyItem(
              inputs,
              singleMedia.file_id,
            )
            if (result) props.navigation.replace('MyFiles')
          }
          }
        >
          <Text>Upload now</Text>
        </Button>
      </Content>
    </Container>

  )
}

Modify.propTypes = {
  route: PropTypes.object,
}

export default Modify
