import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Pages/WelcomeScreen';
import LoginScreen from './Pages/LoginScreen';
import AniversarioScreen from './Pages/AniversarioScreen';
import AcScreen from './Pages/AcScreen';
import DaysScreen from './Pages/DaysScreen';
import StartpilulaScreen from './Pages/StartPilulaScreen';
import LastMentruacaoScreen from './Pages/LastMenstruacaoScreen';
import TimeCicle from './Pages/TimeCicle';
import Home from './Pages/Home';
import Notification from './Pages/notificationScreen';


import './global.css';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
  initialRouteName="TimeCiclo" 
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Aniversario" component={AniversarioScreen} />
  <Stack.Screen name="AcScreen" component={AcScreen} />
  <Stack.Screen name="Days" component={DaysScreen} />
  <Stack.Screen name="StartPilula" component={StartpilulaScreen} />
  <Stack.Screen name="LastMenstruacao" component={LastMentruacaoScreen} />
  <Stack.Screen name="TimeCiclo" component={TimeCicle} />
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="Notification" component={Notification} />
</Stack.Navigator>

    </NavigationContainer>
  );
}
