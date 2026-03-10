import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Platform, StyleSheet,Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
// import { useContext } from 'react';
// import { UserContext } from '../UserContext.js';

type User = {
  email: string;
  username: string;
  password: string;
  favourites: any[];
};

export default function Login() {
  // const { setUsername } = useContext(UserContext);
  type LoginNavigationProp = NativeStackNavigationProp< RootStackParamList,'Login'>;const navigation = useNavigation<LoginNavigationProp>();

  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Vetem nje email dhe password per krahasim
//   const validEmail = 'user@example.com';
//   const validPassword = '123456';

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

   if (!trimmedEmail || !trimmedPassword) {
    if (Platform.OS === 'web') {
      window.alert('Ju lutem plotesoni email dhe password');
    } else {
      Alert.alert('Gabim', 'Ju lutem plotesoni email dhe password');
    }
    return;
  }

    try {
      // Merr te dhenat nga AsyncStorage
       const usersJSON = await AsyncStorage.getItem('users');
      //  const users = usersJSON ? JSON.parse(usersJSON) : [];
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    // Gjej userin me email dhe password
    //  const user = users.find((u: { email: string;password : string }) => u.email === trimmedEmail && u.password === trimmedPassword);

     const user = users.find(u => u.email === trimmedEmail && u.password === trimmedPassword);
     if (user) {
      if (Platform.OS === 'web') {
        window.alert(`Miresevini ${user.username}!`);
      } else {
        Alert.alert('Sukses', `Miresevini ${user.username}!`);
      }

      //vendos ne kontekst usename
      //  setUsername(user.username);
      // navigation.navigate('Home', { username: user.username });
      // navigation.replace('Home');
    } else {
      if (Platform.OS === 'web') {
        window.alert('Email ose password i gabuar');
      } else {
        Alert.alert('Gabim', 'Email ose password i gabuar');
      }
    }

  } catch (error) {
    console.log('Gabim AsyncStorage:', error);
  }
  };
        const handlePress = () => {
         navigation.navigate('SignIn');
        }

  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Text style={styles.header}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handlePress} style={{ backgroundColor: 'white',marginTop : 20, }}>
             <Text style={{ color: 'blue',fontWeight : 'bold', cursor:'pointer', }}>Don't have an account? Go to Sign In</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  div: {
    width : 500,
    height : 500,
    borderColor : 'black',
    borderRadius: 30,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.6)',
  },
  header :{
    marginBottom : 20,
    fontWeight : 'bold',
    fontSize : 30,
  },

  input: {
    height: 50,
    width : 400,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
});