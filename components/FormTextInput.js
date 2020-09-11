import React from 'react'

import {Item, Input, View, Label} from 'native-base'
import PropTypes from 'prop-types'

const FormTextInput = ({error, ...otherProps}) => {
  return (
    <View>
      <Item >
        <Input
          {...otherProps}
        />
      </Item>
      {error !== '' && <Label>{error}</Label>}
    </View>
  )
}


FormTextInput.propTypes = {
  style: PropTypes.object,
}


export default FormTextInput
