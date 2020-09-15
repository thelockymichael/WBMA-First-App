import React, {useState} from 'react'
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
  Icon,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Urls from '../constants/urls'
import useUploadHooks from '../hooks/UploadHooks'
import AsyncStorage from '@react-native-community/async-storage'

const Upload = (props) => {
  const [pickedImage, setPickedImage] = useState()
  const {
    handleInputChange,
    uploadErrors,
    inputs,
    validateOnSend,
  } = useUploadHooks()

  const verifyPermissions = async () => {
    const {status} = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    )
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{text: 'Okay'}],
      )
      return false
    }
    return true
  }

  const pickImage = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    try {
      console.log('ARE WE HERE!!??!?!')
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.cancelled) {
        setPickedImage(result.uri)

        console.log('IMAGE URI', result.uri)
      }
      console.log(result)
    } catch (error) {
      throw new Error(error)
    }
  }

  const doUpload = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed')
      return
    }
    const localUri = pickedImage
    const filename = localUri.split('/').pop()

    console.log('filenamus', filename)
    const match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : 'image'

    if (type === 'image/jpg') {
      type = 'image/jpeg'
    }

    console.log('typus', type)

    const formData = new FormData()

    formData.append('file', {
      uri: localUri,
      name: filename,
      type,
    })
    formData.append('title', inputs.title)
    formData.append('description', inputs.description)

    const token = await AsyncStorage.getItem('userData')
    console.log('token', token)

    console.log('FORM DATA', formData)
    console.log('INPUTS', inputs.title, inputs.description)
    try {
      const response = await fetch(Urls.apiUrl + 'media', {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          'x-access-token': token,
        },
      })

      const json = await response.json()

      console.log('resultus', json)
      props.navigation.goBack()
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Container>
      <Content padder>
        <FormTextInput
          inputLabel="Title"
          autoCapitalize="none"
          placeholder="Title"
          onChangeText={(txt) => handleInputChange('title', txt)}
          error={uploadErrors.title}
        />
        <Card>

          <CardItem cardBody>
            <Image
              source={{
                uri: pickedImage,
              }}
              style={{height: 400, width: null, flex: 1}}
              onLoad={({nativeEvent}) => {
                // console.log(event.nativeEvent.source.url)
                handleInputChange('image', nativeEvent.source.url)
              }}
            />
          </CardItem>
        </Card>
        <FormTextInput
          inputLabel="Description"
          autoCapitalize="none"
          placeholder="Description"
          onChangeText={(txt) => handleInputChange('description', txt)}
          error={uploadErrors.description}
        />
        <Button block onPress={pickImage}>
          <Text>Select Image</Text>
        </Button>
        <Button success block onPress={doUpload}>
          <Text>Upload now</Text>
        </Button>
      </Content>
    </Container>

  )
}

export default Upload
