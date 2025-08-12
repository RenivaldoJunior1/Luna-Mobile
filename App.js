<<<<<<< HEAD
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './Pages/WelcomeScreen';
import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
=======
  import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert, Platform } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  const butaopress = () =>{
    if (Platform.OS === 'web'){
      window.alert("Você clicou no botão")
    } else{
      Alert.alert("Você clicou no botão")
    }
    
  }

  return (
    <LinearGradient
      colors={['#fad0c4', '#ff6ec4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >

      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <View style={styles.card}>
          <Text style={styles.titulo}>👋Olá, Fulano!</Text>
        </View>
        <Text style={styles.subtitulo}>Seja bem-vindo ao App em React Native⚛️ com Expo</Text>
        <TouchableOpacity style={styles.button} onPress={butaopress}>
            <Text style={styles.buttonText}>Clique Aqui</Text>
          </TouchableOpacity>
      </Animated.View>

      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundEmoji: {
    position: 'absolute',
    fontSize: 160,
    opacity: 0.2,
    top: 80,
    left: 40,
    transform: [{ rotate: '20deg' }],
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 34,
    color: '#f4f4f2',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitulo: {
    fontSize: 18,
    color: '#f4f4f2',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
   button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
>>>>>>> 4468ed0a8f0c3c97f0a608317290c11a6adc2f10
