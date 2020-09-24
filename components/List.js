/* eslint-disable no-useless-catch */
import React, {useState, useEffect} from 'react'
import {FlatList, Alert} from 'react-native'
import ListItem from './ListItem'

import PropTypes from 'prop-types'
import {useLoadMedia, deleteFile} from '../hooks/APIhooks'

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
        >
          {props.enableUserButtons &&
            <>
              <Button
                danger
                transparent
                onPress={() => {
                  Alert.alert('Are you sure?',
                    'Do you really want to delete this item?', [
                    {text: 'No', style: 'default'},
                    {
                      text: 'Yes',
                      style: 'destructive',
                      onPress: async () => {
                        const result = await deleteFile(item.file_id)
                        if (result) props.navigation.replace('MyFiles')
                      },
                    },
                  ])
                }}
              >
                <Icon name={'close-circle-outline'}></Icon>
              </Button>
              <Button
                success
                transparent
                onPress={() => {
                  props.navigation.navigate('Modify',
                    {singleMedia: item})
                }}
              >
                <Icon name={'create'}></Icon>
              </Button>
            </>
          }
        </ListItem>
      }
    />
  )
}

List.propTypes = {
  navigation: PropTypes.object,
  loadMedia: PropTypes.func,
  isRefreshing: PropTypes.bool,
  mediaArray: PropTypes.array,
  enableUserButtons: PropTypes.bool,
}


export default List
