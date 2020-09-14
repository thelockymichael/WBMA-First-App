import React, {useContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import FormTextInput from '../components/FormTextInput'
import {
  Image,
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
  Accordion,
} from 'native-base'
import {getAvatar} from '../hooks/APIhooks'
import Urls from '../constants/urls'

const dataArray = [
  {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
]

const Profile = (props) => {
  const {setIsLoggedIn, user} = useContext(AuthContext)
  const [avatar, setAvatar] = useState([{filename: ''}])

  const fetchAvatar = async () => {
    setAvatar(await getAvatar(user.user_id))
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  const logout = async () => {
    setIsLoggedIn(false)
    await AsyncStorage.clear()

    props.navigation.navigate('Authentication')
  }
  return (
    <Container>
      <Content padder>
        {user &&
          <Card>
            <CardItem header bordered>
              <Icon name="person" />
              <Text>Username: {user.username}</Text>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={
                  {
                    uri: Urls.uploads +
                      avatar[0].filename,
                  }}
                style={{height: 400, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
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

        }
        <FormTextInput
          autoCapitalize="none"
          placeholder="username"
          // onChangeText={(txt) => handleInputChange('username', txt)}
          onEndEditing={(event) => {
            // checkUserAvailable(event)
            // handleInputEnd('username', event)
          }} // error={usernameAvailable}
        // error={registerErrors.username}
        />

      </Content>
    </Container>
  )
}


Profile.propTypes = {
  navigation: PropTypes.object,
}

export default Profile
