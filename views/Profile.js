import React, {useContext, useState, useEffect} from 'react'
import {StatusBar} from 'expo-status-bar'
import PropTypes from 'prop-types'
import {
  Image,
  SafeAreaView,
} from 'react-native'
import {AuthContext} from '../contexts/AuthContext'
import AsyncStorage from '@react-native-community/async-storage'
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Button,

} from 'native-base'
import {getAvatar} from '../hooks/APIhooks'
import Urls from '../constants/urls'

const Profile = (props) => {
  const [state, setState] = useContext(AuthContext)
  const [avatar, setAvatar] = useState([{filename: ''}])

  console.log('PERKULE', state.user)

  const fetchAvatar = async () => {
    setAvatar(await getAvatar(state.user.user_id))
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  // console.log('username', formValues.fullname)
  const logout = async () => {
    await AsyncStorage.clear()

    setState((state) => ({...state, isLoggedIn: false}))
    if (!state.isLoggedIn) {
      props.navigation.navigate('Login')
    }
  }
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Icon name="person" />
            <Text>Username: {state.user.username}</Text>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{uri: Urls.uploads + avatar[avatar.length - 1].filename}}
              style={{height: 400, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Body>
              <Text>Username: {state.user.username}</Text>
              <Text>Email: {state.user.email}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button
                block
                onPress={logout}
              >
                <Text>Log out</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}


Profile.propTypes = {
  navigation: PropTypes.object,
}

export default Profile
