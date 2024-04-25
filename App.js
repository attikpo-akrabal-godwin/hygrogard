import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { socket } from './src/socket.js';
import Navbar from './components/NavBar.js'
import ProgressCircle from './components/ProgressCircle.js'
import {
  LineChart,
} from "react-native-chart-kit";
import { useEffect, useState } from 'react';

export default function App() {
  const data = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const [progress, setProgress] = useState(0.2);
  const [i, setI] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [lanpe, setLampe] = useState(true)
  const [lines, setLines] = useState([])
  const maxvalue = 1024;
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sensor', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  useEffect(() => {
    socket.connect()
    socket.emit('auth', { name: 'mobile-app' })
    socket.on('sensor', (data) => {
      setProgress(data)

    });
    socket.on('capteur', (data) => {
      console.log(data)
      setLines(previous => [...previous, data])
      setProgress(data)
    });


  }, [])
  function handleClick() {
    socket.emit('on/off', !lanpe);
    setLampe(!lanpe)
    console.log(!lanpe)
  }
  return (
    <View >
      <Navbar title="Hydroguard" />
      <ProgressCircle progress={progress} radius={90} strokeWidth={10} />
      <LineChart
        data={{
          datasets: [
            {
              data: lines,
            }
          ]
        }}
        width={400} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#007bff", // Couleur de fond
          backgroundGradientFrom: "#007bff", // Dégradé de couleur de fond (début)
          backgroundGradientTo: "#007bff", // Dégradé de couleur de fond (fin)
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Couleur de la ligne
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Couleur des étiquettes
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#007bff" // Couleur des points
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Button onPress={handleClick} title='click' />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
