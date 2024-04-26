import React from 'react';
import { Text, View } from 'react-native';

const ComposantCouleur = ({ valeur }) => {
  return (
    <View style={{
      width: 20,
      height: 20,
      borderRadius: 20,
      backgroundColor: valeur ? 'green' : "red",
      borderWidth: 1,
      borderColor: "red",
      marginLeft: 12,
      position: "absolute",
      top: 10,
      right: 10
    }} />
  );
};

export default ComposantCouleur;
