import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function HomeScreen({ navigation }) {
  const emAlta = [
    { id: "1", title: "Higiene íntima e cuidados", rating: 4.6, image: require("../assets/icon.png") },
    { id: "2", title: "Como reconhecer os sinais do ciclo", rating: 4.7, image: require("../assets/icon.png") },
    { id: "3", title: "Alimentos e emoções", rating: 4.9, image: require("../assets/icon.png") },
  ];

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Conteúdo principal */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Lua circular com texto sobreposto */}
        <View className="items-center mt-40">
          <View style={{ position: 'relative', width: 240, height: 240 }}>
            <Image
              source={require("../assets/LunaHome.png")}
              style={{ width: 240, height: 240 }}
              resizeMode="contain"
            />

            {/* Texto sobreposto - centralizado */}
            <View 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: '#6B7280', 
                fontSize: 11, 
                fontWeight: '500',
                marginBottom: 2,
              }}>
                Próximo período em:
              </Text>
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "#111827",
                  lineHeight: 52,
                }}
              >
                6 dias
              </Text>
              <Text style={{ 
                color: '#9CA3AF', 
                fontSize: 10,
                marginTop: 2,
              }}>
                Média chance de engravidar
              </Text>
            </View>
          </View>
        </View>

        {/* Data atual */}
        <View className="mt-6 mb-4">
          <Text className="text-center text-xl font-bold text-gray-900">
            Hoje, Abril 29
          </Text>
        </View>

        {/* Calendário estilo "pills" */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-center items-center space-x-2">
            {/* Dias com cores */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#99f6e4",
                borderRadius: 25,
                paddingVertical: 6,
                paddingHorizontal: 4,
              }}
            >
              {[27, 28, 29].map((day, i) => (
                <View
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: day === 29 ? "#14b8a6" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 2,
                  }}
                >
                  <Text
                    style={{
                      color: day === 29 ? "#fff" : "#374151",
                      fontWeight: day === 29 ? "bold" : "600",
                      fontSize: 16,
                    }}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Dias seguintes */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fbcfe8",
                borderRadius: 25,
                paddingVertical: 6,
                paddingHorizontal: 4,
              }}
            >
              {[1, 2, 3].map((day, i) => (
                <View
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 2,
                  }}
                >
                  <Text style={{ color: "#374151", fontWeight: "600", fontSize: 16 }}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Seção Em alta */}
        <View className="px-5 mt-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">Em alta</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ConhecaOCiclo")}>
            <Text className="text-blue-500 text-sm font-medium">Veja Mais</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={emAlta}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingRight: 20 }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 130,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  borderRadius: 20,
                  marginRight: 12,
                  padding: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: "100%", height: 100, borderRadius: 15, marginBottom: 4 }}
                  resizeMode="cover"
                />
                <Text numberOfLines={2} style={{ fontSize: 12, color: "#374151", fontWeight: "500" }}>
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="star" size={12} color="#facc15" />
                  <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>{item.rating}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <BottomNav navigation={navigation} />
    </ImageBackground>
  );
}