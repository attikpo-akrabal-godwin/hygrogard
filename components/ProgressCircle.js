import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';

const ProgressCircle = ({ progress, radius, strokeWidth }) => {
  const circumference = 2 * Math.PI * radius;
  const progressValue = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#007bff"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressValue}
        />
        <Text
          x={radius}
          y={radius}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={20}
          fill="#007bff"
        >
          {`${Math.round(progress * 100)}%`}
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressCircle;
