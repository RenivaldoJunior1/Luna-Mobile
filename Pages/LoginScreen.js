import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import { verificarDadosMenstruais } from "../Services/dadosMenstruaisService";

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState("register");
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha, setconfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      if (mode === "login") {
        console.log('🔑 Tentando login com:', email);
        await login(email, senha);
        
        console.log('✅ Login bem-sucedido! Verificando dados menstruais...');
        
        // Aguarda um pouco para garantir que o token foi salvo
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verifica se o usuário já tem dados cadastrados usando o endpoint /listar
        const temDados = await verificarDadosMenstruais();
        
        console.log('📊 Usuário tem dados menstruais?', temDados);
        
        if (temDados) {
          console.log('✅ Usuário já tem dados! Redirecionando para Home...');
          navigation.navigate("Home");
        } else {
          console.log('⚠️ Usuário não tem dados. Redirecionando para cadastro...');
          navigation.navigate("Aniversario");
        }
        
      } else {
        console.log('📝 Dados do registro:', { nome, apelido, email, senha });
        
        // Validações
        if (!nome.trim()) {
          Alert.alert("Erro", "Preencha o nome completo!");
          return;
        }
        if (!apelido.trim()) {
          Alert.alert("Erro", "Preencha o apelido!");
          return;
        }
        if (!email.trim()) {
          Alert.alert("Erro", "Preencha o email!");
          return;
        }
        if (!senha.trim()) {
          Alert.alert("Erro", "Preencha a senha!");
          return;
        }
        if (senha !== confirmarsenha) {
          Alert.alert("Erro", "As senhas não coincidem!");
          return;
        }
        
        console.log('✅ Validações OK, enviando para API...');
        await register(email, senha, nome, apelido);
        Alert.alert("Sucesso", "Usuário registrado! Faça login.", [
          { text: "OK", onPress: () => setMode("login") }
        ]);
      }
    } catch (err) {
      console.error('❌ Erro no handleSubmit:', err);
      Alert.alert("Erro", err.message || "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/BackGround/BACKGROUNDLOGIN.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
          className="flex-1 pt-[150px]"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="rounded-xl min-h-[300px] justify-center">
              <Text className="mt-[60px] text-4xl text-black font-bold ml-2">
                {mode === "login" ? "Login" : "Registrar-se"}
              </Text>

              <View className="mt-8 flex-row bg-[#7676801F] rounded-lg mb-5 mx-2 p-1">
                <TouchableOpacity
                  className={`py-3 px-6 flex-1 items-center border-r-2 border-gray-300 ${
                    mode === "register" ? "bg-white rounded-lg" : ""
                  }`}
                  onPress={() => setMode("register")}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text className="text-lg font-bold text-black">Registre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`py-3 px-6 flex-1 items-center ${
                    mode === "login" ? "bg-white rounded-lg" : ""
                  }`}
                  onPress={() => setMode("login")}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <Text className="text-lg font-bold text-black">Login</Text>
                </TouchableOpacity>
              </View>

              {mode === "register" && (
                <>
                  <TextInput
                    className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                    placeholder="Nome completo"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={(text) => {
                      console.log('Nome digitado:', text);
                      setNome(text);
                    }}
                    editable={!loading}
                  />
                  <TextInput
                    className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                    placeholder="Apelido"
                    placeholderTextColor="#999"
                    value={apelido}
                    onChangeText={(text) => {
                      console.log('Apelido digitado:', text);
                      setApelido(text);
                    }}
                    editable={!loading}
                  />
                </>
              )}

              <TextInput
                className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />

              <TextInput
                className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                editable={!loading}
              />

              {mode === "register" && (
                <TextInput
                  className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmarsenha}
                  onChangeText={setconfirmarSenha}
                  editable={!loading}
                />
              )}

              <View className="mt-5 mb-5">
                {loading ? (
                  <View className="bg-blue-500 py-4 mx-2 rounded-lg items-center justify-center">
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                ) : (
                  <ButtonPrimary title="Confirmar" onPress={handleSubmit} />
                )}
              </View>

              {mode === "login" && !loading && <SocialLogin />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}