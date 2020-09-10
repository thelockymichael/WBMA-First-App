import React, {useContext, useEffect} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import {
  Title,
  Icon,
  Container,
  Content,
} from 'native-base'


import PropTypes from 'prop-types'

import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import {ScrollView} from 'react-native-gesture-handler'

const Authentication = ({navigation}) => {
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
          <Title
            style={{fontSize: 20}}
          >
            Login
          </Title>
          <LoginForm navigation={navigation} />
          <Title
            style={{fontSize: 20, marginTop: 20}}
          >
            Register
          </Title>
          <RegisterForm navigation={navigation} />
        </Content>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


Authentication.propTypes = {
  navigation: PropTypes.object,
}

export default Authentication
