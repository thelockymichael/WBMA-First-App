import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import PropTypes from "prop-types";

const ListItem = ({ singleMedia }) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World</Text>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
