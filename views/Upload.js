import React, {useEffect, useState} from 'react'
import FormTextInput from '../components/FormTextInput'
import PropTypes from 'prop-types'
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
import useUploadHooks from '../hooks/UploadHooks'
import AsyncStorage from '@react-native-community/async-storage'
import {upload} from '../hooks/APIhooks'
import {Video} from 'expo-av'

const Upload = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fileType, setFileType] = useState('image')

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
        handleInputChange('image', result.uri)
      }
      setFileType(result.type)

      console.log(result)
    } catch (E) {
      console.log(E)
    }
  }

  const doUpload = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      // lisätään tekstikentät formDataan
      formData.append('title', inputs.title)
      formData.append('description', inputs.description)

      const {image} = inputs
      // lisätään tiedosto formDataan
      const filename = image.split('/').pop()
      const match = /\.(\w+)$/.exec(filename)
      let type = match ? `${fileType}/${match[1]}` : fileType
      if (type === 'image/jpg') type = 'image/jpeg'


      formData.append('file', {uri: image, name: filename, type})
      const userToken = await AsyncStorage.getItem('userToken')
      console.log('USER TOKEN', userToken)

      const response = await upload(formData, userToken)

      console.log('Upload', response)

      // Wait for 2 seconds
      setTimeout(() => {
        resetForm()
        props.navigation.push('Home')
      }, 2000)
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong!',
        [{
          text: 'Okay',
          style: 'danger',
        }],
      )
    } finally {
      setIsLoading(false)
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
            {fileType === 'image' ?
              <Image
                source={{
                  uri: inputs.image,
                }}
                style={{height: 400, width: null, flex: 1}}
              /> :
              <Video
                source={{
                  uri: inputs.image,
                }}
                style={{height: 400, width: null, flex: 1}}
                useNativeControls={true}
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
          <Text>Select File</Text>
        </Button>
        {isLoading && <Spinner />}
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

Upload.propTypes = {
  navigation: PropTypes.object,
}

export default Upload
