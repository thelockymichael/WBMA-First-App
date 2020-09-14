import React from 'react'

import FormTextInput from '../components/FormTextInput'
import {
  View,
  Text,
  Form,
  Button,
  Container,
  Content,
} from 'native-base'

const Upload = () => {
  return (
    <View>
      <Form>
        <FormTextInput
          autoCapitalize="none"
          placeholder="Title"
          // onChangeText={(txt) => handleInputChange('username', txt)}
          onEndEditing={(event) => {
            // checkUserAvailable(event)
            // handleInputEnd('username', event)
          }} // error={usernameAvailable}
        // error={registerErrors.username}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="Description"
          // onChangeText={(txt) => handleInputChange('username', txt)}
          onEndEditing={(event) => {
            // checkUserAvailable(event)
            // handleInputEnd('username', event)
          }} // error={usernameAvailable}
        // error={registerErrors.username}
        />

        <Button success block onPress={() => {}}>
          <Text>Pick image!</Text>
        </Button>
        <Button block onPress={() => {}}>
          <Text>Save</Text>
        </Button>
      </Form>
    </View >
  )
}


export default Upload
