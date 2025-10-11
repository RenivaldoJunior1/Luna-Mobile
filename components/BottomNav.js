import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav({ navigation }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl h-20 flex-row justify-around items-center pt-2">
      {/* Botão central flutuante */}
      <View className="absolute -top-6 left-1/2 -translate-x-1/2">
        <TouchableOpacity className="bg-[#FFA573] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Ícones laterais */}
      <TouchableOpacity className="items-center">
        <Ionicons name="refresh-circle-outline" size={26} color="#7BDCB5" />
        <Text className="text-[#7BDCB5] text-xs mt-1">Hoje</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Ionicons name="calendar-outline" size={24} color="#9A9AA1" />
        <Text className="text-[#9A9AA1] text-xs mt-1">Calendário</Text>
      </TouchableOpacity>

      {/* Espaço central para o botão flutuante */}
      <View className="w-16" />

<TouchableOpacity
  className="items-center"
  onPress={() => navigation.navigate('Notification')}
>
  <Ionicons name="notifications-outline" size={24} color="#9A9AA1" />
  <Text className="text-[#9A9AA1] text-xs mt-1">Notificações</Text>
</TouchableOpacity>


      <TouchableOpacity className="items-center">
        <Ionicons name="settings-outline" size={24} color="#9A9AA1" />
        <Text className="text-[#9A9AA1] text-xs mt-1">Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}
