import React from 'react';
import {View,Text,StyleSheet,ImageBackground,SafeAreaView,Platform,StatusBar,TouchableOpacity,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUND.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bemvindo}>
          <Text style={styles.title}>Seja bem-vinda!</Text>
          <Text style={styles.subtitle}>Aqui você pode acompanhar seu ciclo menstrual com facilidade e cuidar ainda melhor da sua saúde.!</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginRight: 10,
  },
  bemvindo: {
    position: 'absolute',
    bottom: 80, // você pode ajustar conforme o que quiser
    left: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'regular',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FE9C6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Android Elevation
    elevation: 8, 
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'SemiBold',
    color: '#6B5F5F',
  },
});
