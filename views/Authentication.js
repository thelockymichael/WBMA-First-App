import React, {useState, useEffect} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import {
  Title,
  Icon,
  Text,
  Container,
  Button,
  Content,
} from 'native-base'


import PropTypes from 'prop-types'

import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import {ScrollView} from 'react-native-gesture-handler'

const Authentication = ({navigation}) => {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}
    >
      <ScrollView>
        <Content padder>
          <Title>
            <Icon
              name="logo-octocat"
              style={{fontSize: 200}}
            />
          </Title>
          {!isSignup &&
            <>
              <Title
                style={{fontSize: 20}}
              >
                Login
              </Title>
              <LoginForm navigation={navigation} />
            </>
          }
          {isSignup &&
            <>
              <Title
                style={{fontSize: 20, marginTop: 20}}
              >
                Register
              </Title>
              <RegisterForm navigation={navigation} />
            </>
          }
          <Button
            transparent
            onPress={() => {
              setIsSignup(!isSignup)
            }}
          >
            <Text>{`Switch to ${isSignup ? 'Login' : 'Sign up'}`}</Text>
          </Button>
        </Content>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


Authentication.propTypes = {
  navigation: PropTypes.object,
}

export default Authentication
