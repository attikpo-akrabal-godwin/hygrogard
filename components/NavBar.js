import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from '../assets/logo.jpg';

const NavBar = ({ title, isconected }) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.lampeContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{...styles.userProfile, backgroundColor: isconected ? 'green' : "red" }}>
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
    height: 20,
    width: 20,
    borderRadius: 45,
    borderWidth: 0.5,
    borderColor: "grey"
  },
  lampeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain' // Ajuste l'image au conteneur
  }
});

export default NavBar;
