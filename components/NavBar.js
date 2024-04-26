import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComposantCouleur from './ComposantCouleur';

const NavBar = ({ title, lampe }) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.lampeContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.userProfile}>
        <ComposantCouleur valeur={lampe} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    backgroundColor: 'white',
    // padding: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    // paddingVertical: 15,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userProfile: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderWidth: 0.5,
    borderColor: "grey"
  },
  lampeContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default NavBar;
