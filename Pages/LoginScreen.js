import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState('register');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarsenha, setconfirmarSenha] = useState('');


  const handleSubmit = () => {
    if (mode === 'login') {
      console.log('Login com:', { email, senha });
      navigation.navigate('Home');
    } else {
      console.log('Registrar com:', { nome, email, senha, confirmarsenha });
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/BackGround/BACKGROUNDLOGIN.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
          style={styles.keyboard}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Caixa cinza com as duas opções */}
            

            {/* Formulário */}
            <View style={styles.formContainer}>
              <Text style={styles.title}>
                {mode === 'login' ? 'Login' : 'Registrar-se'}
              </Text>

              <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[
                  styles.optionBox,
                  mode === 'register' && styles.optionBoxActive,
                  styles.leftOption,
                ]}
                onPress={() => setMode('register')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    mode === 'register' && styles.optionTextActive,
                  ]}
                >
                  Registre-se
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionBox,
                  mode === 'login' && styles.optionBoxActive,
                  styles.rightOption,
                ]}
                onPress={() => setMode('login')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    mode === 'login' && styles.optionTextActive,
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>

              {mode === 'register' && (
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor="#999"
                  value={nome}
                  onChangeText={setNome}
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              {mode === 'register' && (
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmarsenha}
                  onChangeText={setconfirmarSenha}
                />
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
   keyboard: {
    flex: 1,
    paddingTop: 150, 
  },
  formContainer: {
  borderRadius: 12,
  minHeight: 300,
  justifyContent: 'center',
},
  optionContainer: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#7676801F',
    borderRadius: 10,
    marginBottom: 20,
    margin: 10,
    padding: 3,
  },
  optionBox: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
  },
  optionBoxActive: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  optionTextActive: {
    color: '#000000',
  },
  leftOption: {
    borderRightWidth: 2,
    borderRightColor: '#ccc',
  },
  rightOption: {
    
  },
  title: {
    marginTop: 60,
    fontSize: 32,
    color: '#000000ff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#FE9C6B',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
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
    fontWeight: '600',
    color: '#6B5F5F',
  },
});
