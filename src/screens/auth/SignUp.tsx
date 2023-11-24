import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { Text } from "@ui//Text";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignUp() {
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  function handleNavigateToCompleteSignUp() {
    navigation.navigate("CompleteSignUp");
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={handleNavigateToCompleteSignUp}>
        <Text>Terminar Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}