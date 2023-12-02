import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "@contexts/UserContext";

import { Text } from "@components/ui//Text";

export function Profile() {
  const { handleUserUnlogged } = useContext(UserContext);

  function handleSignOut() {
    // await SignOut
    handleUserUnlogged();
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
