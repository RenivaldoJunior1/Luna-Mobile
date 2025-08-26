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
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState("register");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha, setconfirmarSenha] = useState("");

  // Pega tudo do hook
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    try {
      if (mode === "login") {
        await login(email, senha);
        // ✅ Não precisa mais logar token/user aqui, já loga dentro do hook
        navigation.navigate("Aniversario");
      } else {
        if (senha !== confirmarsenha) {
          alert("As senhas não coincidem!");
          return;
        }
        await register(email, senha);
        alert("Usuário registrado com sucesso! Faça login.");
        setMode("login");
      }
    } catch (err) {
      alert(err.message);
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
                >
                  <Text className="text-lg font-bold text-black">Registre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`py-3 px-6 flex-1 items-center ${
                    mode === "login" ? "bg-white rounded-lg" : ""
                  }`}
                  onPress={() => setMode("login")}
                  activeOpacity={0.8}
                >
                  <Text className="text-lg font-bold text-black">Login</Text>
                </TouchableOpacity>
              </View>

              {mode === "register" && (
                <TextInput
                  className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                  placeholder="Nome completo"
                  placeholderTextColor="#999"
                  value={nome}
                  onChangeText={setNome}
                />
              )}

              <TextInput
                className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              {mode === "register" && (
                <TextInput
                  className="bg-[#F2F2F7] py-4 px-2 rounded-lg mb-4 text-base mx-2"
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmarsenha}
                  onChangeText={setconfirmarSenha}
                />
              )}

              <View className="mt-5 mb-5">
                <ButtonPrimary title="Confirmar" onPress={handleSubmit} />
              </View>

              {mode === "login" && <SocialLogin />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
