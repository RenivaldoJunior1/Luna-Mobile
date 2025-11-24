import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

export default function ConfiguracoesScreen({ navigation }) {
  const menuItems = [
    {
      id: 1,
      icone: "settings-outline",
      titulo: "Configurações do aplicativo",
      onPress: () => console.log("Configurações do app"),
    },
    {
      id: 2,
      icone: "shield-outline",
      titulo: "Configurações de privacidade",
      onPress: () => console.log("Privacidade"),
    },
    {
      id: 3,
      icone: "notifications-outline",
      titulo: "Lembretes",
      onPress: () => console.log("Lembretes"),
    },
    {
      id: 4,
      icone: "water-outline",
      titulo: "Ciclo e ovulação",
      onPress: () => console.log("Ciclo e ovulação"),
    },
    {
      id: 5,
      icone: "lock-closed-outline",
      titulo: "Bloqueio do app",
      onPress: () => console.log("Bloqueio do app"),
    },
    {
      id: 6,
      icone: "gift-outline",
      titulo: "Recomende para alguém",
      onPress: () => console.log("Recomendar"),
    },
    {
      id: 7,
      icone: "help-circle-outline",
      titulo: "Ajuda",
      onPress: () => console.log("Ajuda"),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Background das ondas no topo */}
      <View className="absolute top-0 w-full h-32">
        <Image
          source={require("../assets/BackGround/BackHome.png")}
          style={{ width: "100%", height: 128 }}
          resizeMode="cover"
        />
      </View>

      {/* Header */}
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="settings" size={24} color="#111827" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#111827",
              marginLeft: 8,
            }}
          >
            Configurações
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Card do Perfil */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#d1fae5",
              borderRadius: 20,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Foto do perfil */}
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#a78bfa",
                marginRight: 16,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="cover"
              />
            </View>

            {/* Info do usuário */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                Aashifa Sheikh
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                contact.uiuxexperts@gmail.com
              </Text>

              {/* Botão Ver perfil */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#fb923c",
                  paddingVertical: 6,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  alignSelf: "flex-start",
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  Ver perfil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Minha meta */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#111827",
              }}
            >
              Minha meta:
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fb923c",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginRight: 6,
                }}
              >
                Monitorar ciclo
              </Text>
              <Ionicons name="pencil" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu de opções */}
        <View style={{ paddingHorizontal: 20 }}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f9fafb",
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderRadius: 12,
                marginBottom: 10,
              }}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icone} size={24} color="#111827" />
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: "#111827",
                  marginLeft: 12,
                  fontWeight: "500",
                }}
              >
                {item.titulo}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer com links */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity style={{ marginHorizontal: 8, marginVertical: 4 }}>
              <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                Política de Privacidade
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: "#d1d5db" }}>•</Text>
            <TouchableOpacity style={{ marginHorizontal: 8, marginVertical: 4 }}>
              <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                Termos de Uso
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: "#d1d5db" }}>•</Text>
            <TouchableOpacity style={{ marginHorizontal: 8, marginVertical: 4 }}>
              <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                Declaração de Acessibilidade
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </View>
  );
}