import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const LineChart = ({ data, width, height }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const scaleY = height / (maxValue - minValue);

  const points = data.map((value, index) => {
    const x = (width / (data.length - 1)) * index;
    const y = height - (value - minValue) * scaleY;
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke="#ccc"
          strokeWidth="1"
        />
        <Line
          points={points}
          fill="none"
          stroke="#007bff"
          strokeWidth="2"
        />
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

export default LineChart;
