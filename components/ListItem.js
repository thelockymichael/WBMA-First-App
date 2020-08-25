import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

const ListItem = ({ singleMedia }) => {
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity>
        <Image
          style={{ flex: 1, width: 100, height: 100 }}
          source={{ uri: singleMedia.thumbnails.w160 }}
        />
        <View style={{ flex: 2, marginHorizontal: 20 }}>
          <Text style={styles.titleText}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    backgroundColor: "#D3D3D3",
    marginVertical: 2,
  },
  titleText: {
    fontWeight: "bold",
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
