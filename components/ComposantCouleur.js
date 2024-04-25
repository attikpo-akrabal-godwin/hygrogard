import React from 'react';
import { Text, View } from 'react-native';

const ComposantCouleur = ({ valeur }) => {
    return (
        <View style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: valeur ? 'green' : 'red'
        }} />
      );
};

export default ComposantCouleur;
