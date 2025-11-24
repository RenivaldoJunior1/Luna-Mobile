import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function ConhecaOCiclo({ navigation }) {
  const sections = [
    {
      title: "Conheça seu ciclo",
      cards: [
        {
          title: "Cólica e Desconforto: descubra formas de aliviar a dor",
          image: require("../assets/notificacao1.png"),
          bg: "bg-teal-100"
        },
        {
          title: "Evite vazamentos na menstruação",
          image: require("../assets/notificacao1.png"),
          bg: "bg-cyan-100"
        },
      ],
    },
    {
      title: "Nosso guia sobre o fluxo",
      cards: [
        {
          title: "Seu ciclo: Leve, médio ou intenso?",
          image: require("../assets/notificacao1.png"),
          bg: "bg-orange-100"
        },
        {
          title: "Guia de produtos menstruais",
          image: require("../assets/notificacao1.png"),
          bg: "bg-pink-300"
        },
      ],
    },
    {
      title: "Sexo",
      cards: [
        {
          title: "Desejo e Libido: entenda como o ciclo influencia sua atração",
          image: require("../assets/notificacao1.png"),
          bg: "bg-pink-100"
        },
        {
          title: "Escolha seu primeiro brinquedo sexual",
          image: require("../assets/notificacao1.png"),
          bg: "bg-purple-200"
        },
      ],
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/BackGround/BackHome.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >


      {/* Header com botão voltar e bookmark */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4 z-10">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons name="bookmark-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}
      >
        {sections.map((section, index) => (
          <View key={index} className="mb-6 px-4">
            <Text className="text-xl font-bold mb-4 text-gray-900">
              {section.title}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {section.cards.map((card, i) => (
                <TouchableOpacity
                  key={i}
                  className={`w-[48%] mb-4 rounded-2xl overflow-hidden ${card.bg}`}
                  activeOpacity={0.8}
                >
                  {/* Container da imagem */}
                  <View className="p-3">
                    <Image
                      source={card.image}
                      className="w-full h-28 rounded-xl"
                      resizeMode="cover"
                    />
                  </View>
                  
                  {/* Texto do card */}
                  <View className="px-3 pb-4">
                    <Text className="text-xs font-semibold text-gray-900 leading-4">
                      {card.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer fixo */}
      <BottomNav navigation={navigation} />
   </ImageBackground>
  );
}