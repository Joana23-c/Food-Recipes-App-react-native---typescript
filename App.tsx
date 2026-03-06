import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  let messageObj = {
    name : 'joana',
    age : 33
  };

  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! { messageObj.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
