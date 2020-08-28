/* eslint-disable no-useless-catch */
import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import ListItem from './ListItem'

import PropTypes from 'prop-types'

/* const url =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json'
 */

const url = 'http://media.mw.metropolia.fi/wbma/media/'
const List = (props) => {
  const [mediaArray, setMediaArray] = useState([])

  const loadMedia = async () => {
    const response = await fetch(url)
    const json = await response.json()
    console.log(json)

    const result = await Promise.all(json.map(async (item) => {
      const response = await fetch(url + item.file_id)
      const json = await response.json()
      return json
    }))
    setMediaArray(result)

    console.log('RESULT', result)
  }

  useEffect(() => {
    try {
      loadMedia()
    } catch (error) {
      throw error
    }
  }, [])
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem navigation={props.navigation}
          singleMedia={item} />}
    />
  )
}

List.propTypes = {
  navigation: PropTypes.object,
}


export default List
