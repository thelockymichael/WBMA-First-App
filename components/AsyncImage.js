import React, {useState} from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View, TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'


const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false)

  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }

  const {placeholderColor, style, source} = props
  return (
    <View style={style}>

      <Image
        style={styles.image}
        source={source}
        onLoad={onLoad}
      />
      {!loaded &&
        <View style={[style, {

          position: 'absolute',
          justifyContent: 'center',
        }]}>
          <ActivityIndicator size="large" color={placeholderColor} />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
})

AsyncImage.propTypes = {
  placeholderColor: PropTypes.string,
  style: PropTypes.object,
  source: PropTypes.object,
}

export default AsyncImage
