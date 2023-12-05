import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { InputErrorMessage } from "@layout/InputErrorMessage";
import { Loading } from "@layout/Loading";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { Text } from "@ui/Text";
import { TextButton } from "@ui/TextButton";
import * as yup from "yup";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { LoginUser } from "@models/index";
import { loginUser } from "@services/authentication";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Preencha o Email.")
      .email("Insira um Email válido."),
    password: yup
      .string()
      .required("Defina uma Senha.")
      .min(8, "A senha deve ter no mínimo 8 caracteres."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<AuthNavigationRoutesProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      await loginUser({
        email,
        password,
      } satisfies LoginUser);

      reset();
      navegarLogin();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  function navegarLogin() {
    navigation.navigate("Login");
  }

  return (
    <View className="flex-1 py-6">
      <View className="items-center px-10 pb-4">
        <Text className="mb-6 max-w-[200px] text-center font-inter-600 text-xl">
          Create Account
        </Text>
        <Text className="text-center text-xs text-theme-gray-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="py-4 px-10">
          <Text>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                inputProps={{
                  onChangeText: onChange,
                  onBlur: onBlur,
                  value: value,
                  placeholder: "example@gmail.com",
                }}
              />
            )}
            name="email"
          />
          <InputErrorMessage message={errors.email?.message} />

          <Text>Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                inputProps={{
                  onChangeText: onChange,
                  onBlur: onBlur,
                  value: value,
                  placeholder: "********",
                }}
                secureInput
              />
            )}
            name="password"
          />
          <InputErrorMessage message={errors.password?.message} />

          <View className="mb-8 flex-row gap-2">
            <View className="h-4 w-4 rounded-sm bg-theme-gray-medium"></View>
            <Text>Agree with Terms and conditions</Text>
          </View>

          {isLoading ? (
            <Loading />
          ) : (
            <Button
              touchableOpacityProps={{
                onPress: handleSubmit(onSubmit),
              }}
              textProps={{
                textClass: "text-theme-white",
              }}
            >
              Avançar
            </Button>
          )}

          <View className="flex-row items-center gap-2 py-8 px-8">
            <View className="h-px flex-1 bg-theme-gray-medium"></View>
            <Text className="text-xs">Or sign up with</Text>
            <View className="h-px flex-1 bg-theme-gray-medium"></View>
          </View>

          <View className="mb-8 flex-row items-center justify-center gap-3">
            <View className="h-12 w-12 rounded-full border"></View>
            <View className="h-12 w-12 rounded-full border"></View>
            <View className="h-12 w-12 rounded-full border"></View>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="mr-1 text-xs">Already hava an account?</Text>
            <TextButton
              underline
              touchableOpacityProps={{
                onPress: () => {},
              }}
            >
              SignIn!
            </TextButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
