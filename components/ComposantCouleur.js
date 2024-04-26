import React from 'react';
import { Text, View } from 'react-native';

const ComposantCouleur = ({ valeur }) => {
  return (
    <View style={{
      width: 20,
      height: 20,
      borderRadius: 20,
      backgroundColor: valeur ? 'green' : "rgba(255, 0, 0, 0.6)",
      borderWidth: 1,
      borderColor: "red",
      marginLeft: 12,
      position: "absolute",
      top: -2,
      right: 0
    }} />
  );
};

export default ComposantCouleur;
