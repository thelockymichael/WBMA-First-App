import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native'

import {Item, Input} from 'native-base'
import PropTypes from 'prop-types'

const FormTextInput = (props) => {
  return (
    <Item >
      <Input
        {...props}
      />
    </Item>
  )
}


FormTextInput.propTypes = {
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
})

export default FormTextInput
