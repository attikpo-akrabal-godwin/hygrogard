import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComposantCouleur from './ComposantCouleur';

const NavBar = ({ title ,lampe}) => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.title}>{title}</Text>
      <ComposantCouleur valeur={lampe} />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NavBar;
