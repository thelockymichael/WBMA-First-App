import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import ListItem from './ListItem'

const url =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json'

const List = () => {
  const [mediaArray, setMediaArray] = useState([])

  useEffect(() => {
    try {
      const loadMedia = async () => {
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)

        setMediaArray(json)

        console.log(json)
      }

      loadMedia()
    } catch (error) {
      throw error
    }
  }, [])
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => item.filename}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  )
}

export default List
