import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "@contexts/UserContext";

import { Text } from "@components/ui//Text";

export function CompleteRegister() {
  const { handleUserLogged } = useContext(UserContext);

  function handleSignIn() {
    // await signIn
    handleUserLogged();
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={handleSignIn}>
        <Text>Criar Usuario</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
