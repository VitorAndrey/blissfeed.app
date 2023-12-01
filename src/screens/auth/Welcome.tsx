import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import { Text } from "@ui//Text";

export function Welcome() {
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  function handleNavigateToRegister() {
    navigation.navigate("Register");
  }

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-20 font-happy-monkey text-4xl">Blissfeed</Text>

      <TouchableOpacity onPress={handleNavigateToRegister} className="mb-4">
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToLogin}>
        <Text>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}
