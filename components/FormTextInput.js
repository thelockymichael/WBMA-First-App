import React from 'react'

import {Item, Input, View, Label} from 'native-base'
import PropTypes from 'prop-types'

const FormTextInput = ({
  error,
  inputLabel,
  ...otherProps
}) => {
  return (
    <View>
      <Item floatingLabel>
        <Label>{inputLabel}</Label>
        <Input
          {...otherProps}
        />
      </Item>
      {error !== '' && <Label>{error}</Label>}
    </View>
  )
}


FormTextInput.propTypes = {
  inputLabel: PropTypes.string,
  error: PropTypes.string,
}


export default FormTextInput
