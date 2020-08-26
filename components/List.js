import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import ListItem from './ListItem'

const url =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json'

const List = () => {
  const [mediaArray, setMediaArray] = useState([])

  useEffect(() => {
    try {
    } catch (error) {
      throw error
    }
    const loadMedia = async () => {
      const response = await fetch(url)
      const json = await response.json()
      console.log(json)

      setMediaArray(json)
    }

    loadMedia()
  }, [])

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => item.filename}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  )
}

export default List
