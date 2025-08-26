import { TouchableOpacity, Text } from "react-native";

export default function ButtonPrimary({ title, onPress }) {
  return (
    <TouchableOpacity
      className="bg-[#FE9C6B] py-3 rounded-lg mb-3 mx-2 shadow-lg"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-center text-base font-semibold text-[#6B5F5F]">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
