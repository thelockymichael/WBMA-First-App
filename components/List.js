/* eslint-disable no-useless-catch */
import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import ListItem from './ListItem'

import PropTypes from 'prop-types'
import {useLoadMedia} from '../hooks/APIhooks'

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Button,
} from 'native-base'

import {
  Spinner,
} from 'native-base'

const List = (props) => {
  return (

    <FlatList
      onRefresh={props.loadMedia}
      refreshing={props.isRefreshing}
      data={props.mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem
          navigation={props.navigation}
          singleMedia={item}
        />
      }
    />
  )
}

List.propTypes = {
  navigation: PropTypes.object,
  loadMedia: PropTypes.func,
  isRefreshing: PropTypes.bool,
  mediaArray: PropTypes.array,
}


export default List
