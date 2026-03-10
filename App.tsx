import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
// import { UserProvider } from './UserContext.js';

import SignIn from './Login_Signin/SignIn';
import Login from './Login_Signin/login';
// import Home from './homepage/home';
// import Detail from './homepage/detail';
// import Settings from './settings/settings';
// import Fav from './settings/fav';

// type RootStackParamList = {
//   SignIn: undefined;
//   Login: undefined;
// };


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
  // <UserProvider>
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="SignIn"> */}
      <Stack.Navigator >
        {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
        <Stack.Screen name="Fav" component={Fav} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  // </UserProvider>
  );
}