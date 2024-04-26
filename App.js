import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ScrollView, RefreshControl, SafeAreaView, View } from 'react-native';
import { socket } from './src/socket.js';
import Navbar from './components/NavBar.js'
import ProgressCircle from './components/ProgressCircle.js'
import {
  BarChart,
  LineChart,
  PieChart,
} from "react-native-chart-kit";
import { useEffect, useState } from 'react';
import ComposantCouleur from './components/ComposantCouleur.js'

export default function App() {
  const data = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const [progress, setProgress] = useState(0.2);
  const [i, setI] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [lanpe,setLampe] = useState(true)
  const [lines,setLines] = useState([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
  const [refreshing, setRefreshing] = useState(false);
  const maxvalue = 1024;

  const onRefresh = () => {
    setRefreshing(true);
    connection()
    setTimeout(() => {
      setRefreshing(false);
    }, 100); // Temps fictif pour simuler une opération de rafraîchissement
  };

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
    connection()
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
  function connection() {
    socket.connect();
  }
  function handleClick() {
    socket.emit('on/off', !lanpe);
    setLampe(!lanpe)
    console.log(!lanpe)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar title="Hydroguard" lampe={isConnected} />
      <ScrollView
        style={{ padding: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

        {/* Section 1 */}
        <Title color="skyblue" title="Progress Circle" />
        <Text style={styles.descriptionText}>
          Description of the progress circle displayed on bottom of this. Maybe not important.
        </Text>
        <View style={styles.progressContainer}>
          <ProgressCircle
            progress={progress}
            radius={90}
            strokeWidth={10}
          />
        </View>

        {/* Section 2 */}
        <Title color="lightgreen" title="Line Chart" />
        <Text style={styles.descriptionText}>
          Description of the Line chart displayed on bottom of this. Maybe not important.
        </Text>
        <LineChart
          data={{
            datasets: [
              {
                data: lines.slice(-10),
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
            propsForDots: {
              r: "6", strokeWidth: "2", stroke: "#007bff"
            }
          }}
        />

        {/* <StatusBar style="auto" /> */}
      </ScrollView>
      <View style={{ padding: 12 }}>
        <Button onPress={handleClick} title='Click !' />
      </View>
    </SafeAreaView>
  );
}

const Title = ({ title, color }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{
        height: 12, width: 12,
        borderRadius: 12,
        backgroundColor: color, marginRight: 10
      }}></View>
      <Text style={styles.titleText}>{title}</Text>
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
  progressContainer: {
    borderWidth: 0.3,
    alignItems: "flex-start",
    backgroundColor: "whitesmoke",
    borderColor: "grey",
    marginBottom: 20
  },
  titleText: {
    fontSize: 18,
    color: "#24292E",
    // marginBottom: 6
  },
  descriptionText: {
    fontSize: 14,
    color: "grey",
    fontWeight: "400",
    marginBottom: 10
  }
});