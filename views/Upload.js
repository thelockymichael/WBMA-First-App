import React, {useEffect, useState} from 'react'
import FormTextInput from '../components/FormTextInput'
import {
  Image,
  Platform,
  Alert,
} from 'react-native'
import {
  View,
  Text,
  Form,
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Label,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import useUploadHooks from '../hooks/UploadHooks'
import AsyncStorage from '@react-native-community/async-storage'
import {upload} from '../hooks/APIhooks'

const Upload = (props) => {
  const {
    handleInputChange,
    uploadErrors,
    inputs,
    canBeSubmitted,
    resetForm,
  } = useUploadHooks()


  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      console.log('status', status)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.cancelled) {
        // setPickedImage(result.uri)
        handleInputChange('image', result.uri)
        /*         onLoad={({nativeEvent}) => {
          console.log('EVENTUS MAXIMUS', nativeEvent.source.url)
          handleInputChange('image', nativeEvent.source.url)
        }} */
      }

      console.log(result)
    } catch (E) {
      console.log(E)
    }
  }

  const doUpload = async () => {
    const formData = new FormData()
    // lisätään tekstikentät formDataan
    formData.append('title', inputs.title)
    formData.append('description', inputs.description)

    const {image} = inputs
    // lisätään tiedosto formDataan
    const filename = image.split('/').pop()
    const match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : 'image'
    if (type === 'image/jpg') type = 'image/jpeg'
    formData.append('file', {uri: image, name: filename, type})
    const userToken = await AsyncStorage.getItem('userToken')
    console.log('USER TOKEN', userToken)

    try {
      const response = await upload(formData, userToken)

      console.log('Upload', response)

      // Resets form
      resetForm()

      setTimeout(() => {
        props.navigation.push('Home')
      }, 2000)
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong!'
        [{
          text: 'Okay',
          style: 'danger',
        }],
      )
    }
  }

  useEffect(() => {
    getPermissionAsync()
  }, [])

  return (
    <Container>
      <Content padder>
        <Label danger>Image *</Label>
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri: inputs.image,
              }}
              style={{height: 400, width: null, flex: 1}}
            />
          </CardItem>
        </Card>
        <Form>
          <FormTextInput
            inputLabel="Title *"
            autoCapitalize="none"
            placeholder="Title"
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}
            value={inputs.title}
          />
          <FormTextInput
            inputLabel="Description"
            autoCapitalize="none"
            placeholder="Description"
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}
            value={inputs.description}
          />
        </Form>
        <Button block onPress={pickImage}>
          <Text>Select Image</Text>
        </Button>
        <Button block onPress={resetForm}>
          <Text>Reset Form</Text>
        </Button>
        <Button
          disabled={canBeSubmitted()}
          block
          onPress={doUpload}
        >
          <Text>Upload now</Text>
        </Button>
      </Content>
    </Container>

  )
}

export default Upload
