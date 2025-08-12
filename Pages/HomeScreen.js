import React from 'react';
import {View,Text,StyleSheet,ImageBackground,SafeAreaView,Platform,StatusBar,TouchableOpacity,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUNDLOGIN.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bemvindo}>
          <Text style={styles.title}>HOME</Text>
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
  },
  bemvindo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
  },
});
