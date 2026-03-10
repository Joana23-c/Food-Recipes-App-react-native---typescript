import  { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Platform,Text,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
   
export default function SignIn() {

  //screeni aktual eshte sign in
  type SignInNavigationProp = NativeStackNavigationProp< RootStackParamList,'SignIn'>;
  const navigation = useNavigation<SignInNavigationProp>();
  // const navigation = useNavigation();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
    
      // clearAllStorage();

    
    useEffect(() => {
      console.log('Storage para cfaredolloj nderhyrje :')
     showAllStorage();
     }, []);

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '' || !emailCheck(trimmedEmail) || trimmedPassword === '' || !passCheck(trimmedPassword) || trimmedUsername=== '' || !userNamemcheck(trimmedUsername)) {
      if (Platform.OS === 'web') {
        window.alert('Ju lutem plotesoni kredencialet e duhura');
      } else {
        Alert.alert('Gabim', 'Ju lutem plotesoni krendencialet e duhura');
      }
      return;
    } 
     try {
    const usersJSON = await AsyncStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    
    const emailExists:boolean = users.some((u: { email: string }) => u.email === trimmedEmail); 
      if (emailExists) {
        
        if (Platform.OS === 'web') {
          window.alert('Ky email eshte regjistruar tashme! Shko te Login.');
        } else {
          Alert.alert('Info', 'Ky email eshte regjistruar tashme! Shko te Login.');
        }
        console.log('Storage ne login kur useri eshte i regjistruara me pare')
        showAllStorage();
        navigation.navigate('Login');
        return;
      }

       const newUser = { 
         email: trimmedEmail, 
         username: trimmedUsername, 
         password: trimmedPassword, 
         favourites: [] 
       };
    users.push(newUser);


    await AsyncStorage.setItem('users', JSON.stringify(users));

      if (Platform.OS === 'web') {
        window.alert('Jeni regjistruar me sukses!');
      } else {
        Alert.alert('Sukses', 'Jeni regjistruar me sukses!');
      }
      console.log('Sotrage pas regjistrimit te nje useri te ri');
      showAllStorage();

     
      navigation.navigate('Login');

    } catch (error) {
      console.log('Gabim AsyncStorage:', error);
    }
  };

      const handlePress = () => {
         navigation.navigate('Login');
        }
  return (
    <View style={styles.container}>
      <View style={styles.div}>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="SignIn" onPress={handleSignIn} />

      <TouchableOpacity onPress={handlePress} style={{ backgroundColor: 'white',marginTop : 20, }}>
       <Text style={{ color: 'blue',fontWeight : 'bold', cursor:'pointer', }}>Already have an account? Go to Log In</Text>
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
const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage u pastrua komplet!');
    alert('Te gjitha te dhenat u fshine');
  } catch (error) {
    console.log('Gabim gjate fshirjes se AsyncStorage:', error);
  }
};

const userNamemcheck = (str:string) =>{
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(str); //vetem shkronja dhe numra, por duhet te filloje patjeter me nje shkronje
}
const emailCheck = (str : string) => {
  return /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._-]*[a-zA-Z0-9]?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(str);
}
const passCheck = (str: string) => {
  return /^[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(str);
}

const showAllStorage = async () => {
  const usersJSON = await AsyncStorage.getItem('users');
  const users = usersJSON ? JSON.parse(usersJSON) : [];
  console.log('Te gjithe user-at:', users);
};

