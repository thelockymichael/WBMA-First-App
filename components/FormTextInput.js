import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

const FormTextInput = (props) => {
  const {style} = props

  return (
    <View style={styles.formControl}>
      <TextInput
        {...props}
        style={[styles.textInput, style]}
      />
    </View>
  )
}
/*
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
}) */

FormTextInput.propTypes = {
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  textInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default FormTextInput
