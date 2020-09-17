/* eslint-disable no-useless-catch */
import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import ListItem from './ListItem'

import PropTypes from 'prop-types'
import {useLoadMedia} from '../hooks/APIhooks'

import {
  Spinner,
} from 'native-base'

const List = (props) => {
  const mediaArray = useLoadMedia()


  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem
          navigation={props.navigation}
          singleMedia={item}
        />}
    />
  )
}

List.propTypes = {
  navigation: PropTypes.object,
}


export default List
