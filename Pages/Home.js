import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function HomeScreen({ navigation }) {
  const emAlta = [
    {
      id: "1",
      title: "Higiene íntima e cuidados",
      rating: 4.6,
      image: require("../assets/icon.png"),
    },
    {
      id: "2",
      title: "Como reconhecer os sinais do ciclo",
      rating: 4.7,
      image: require("../assets/icon.png"),
    },
    {
      id: "3",
      title: "Alimentos e emoções",
      rating: 4.9,
      image: require("../assets/icon.png"),
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {/* Use um overlay leve para contraste se quiser */}
      <View className="flex-1 ">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Topo com a lua */}
          <View className="items-center mt-10">
            <Image
              source={require("../assets/LunaHome.png")}
              className="w-52 h-52"
              resizeMode="contain"
            />

            <View className="absolute top-14 items-center">
              <Text className="text-gray-700 font-semibold">
                Próximo período em:
              </Text>
              <Text className="text-5xl font-extrabold text-gray-900 my-1">
                6 dias
              </Text>
              <Text className="text-gray-500 text-sm">
                Média chance de engravidar
              </Text>
            </View>
          </View>

          {/* Data atual */}
          <View className="mt-6 mb-4">
            <Text className="text-center text-xl font-bold text-gray-900">
              Hoje, Abril 29
            </Text>

            {/* Linha de datas */}
            <View className="mt-4">
              {/* Dias da semana */}
              <View className="flex-row justify-center space-x-5 mb-1">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((dia, i) => (
                  <Text
                    key={i}
                    className="text-gray-400 text-xs font-semibold text-center"
                  >
                    {dia}
                  </Text>
                ))}
              </View>

              {/* Números dos dias */}
              <View className="flex-row justify-center items-center">
                {/* Parte verde */}
                <View className="flex-row bg-green-100 px-3 py-1 rounded-full">
                  {[27, 28].map((n) => (
                    <View
                      key={n}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <Text className="text-gray-800 font-semibold">{n}</Text>
                    </View>
                  ))}

                  {/* Dia atual */}
                  <View className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center -ml-1">
                    <Text className="text-white font-semibold">29</Text>
                  </View>
                </View>

                {/* Espaço entre blocos */}
                <View className="w-3" />

                {/* Parte rosa */}
                <View className="flex-row bg-pink-200 px-3 py-1 rounded-full">
                  {[1, 2, 3].map((n) => (
                    <View
                      key={n}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <Text className="text-gray-800 font-semibold">{n}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Seção Em alta */}
          <View className="px-5 mt-6 mb-20">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-gray-900">
                Em alta
              </Text>
              <Text className="text-blue-500 text-sm">Veja Mais</Text>
            </View>

            <FlatList
              data={emAlta}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingRight: 20 }}
              renderItem={({ item }) => (
                <View className="w-40 bg-white rounded-2xl mr-4 shadow p-3">
                  <Image
                    source={item.image}
                    className="w-full h-24 rounded-xl mb-2"
                    resizeMode="cover"
                  />
                  <Text
                    numberOfLines={2}
                    className="text-gray-800 text-sm font-medium"
                  >
                    {item.title}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={14} color="#facc15" />
                    <Text className="text-gray-600 text-xs ml-1">
                      {item.rating}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
        
      </View>
      <BottomNav navigation={navigation} />
    </ImageBackground>
    
  );
}
