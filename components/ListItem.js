import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.imageBox}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    marginVertical: 2,
  },
  imageBox: {
  },
  textBox: {
    flexDirection: 'column',
    width: '60%%',

  },
  titleText: {
    fontWeight: 'bold',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
