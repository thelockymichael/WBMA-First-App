import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View, TouchableOpacity,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity>
      <View style={styles.gridItem}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={{uri: singleMedia.thumbnails.w160}}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textBox: {
    padding: 10,
    flexDirection: 'column',
    width: '60%%',
  },
  titleText: {
    fontSize: 24,
    color: '#ED7117',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
})

ListItem.propTypes = {
  singleMedia: PropTypes.object,
}

export default ListItem
