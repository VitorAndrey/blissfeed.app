import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { RegisterUser } from "@models/index";
import { registerUser } from "@services/authentication";

import { InputErrorMessage } from "@components/layout/InputErrorMessage";
import { Loading } from "@components/layout/Loading";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Text } from "@components/ui/Text";

const schema = yup
  .object({
    name: yup.string().required("Preencha o Nome."),
    email: yup
      .string()
      .required("Preencha o Email.")
      .email("Insira um Email válido."),
    password: yup
      .string()
      .required("Defina uma Senha.")
      .min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmPassword: yup
      .string()
      .required("Confirme sua Senha.")
      .oneOf([yup.ref("password")], "As duas senhas devem combinar."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export function Register() {
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

    const { name, email, password } = data;

    try {
      await registerUser({
        name,
        email,
        password,
      } satisfies RegisterUser);

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
    <SafeAreaView className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              inputProps={{
                onChangeText: onChange,
                onBlur: onBlur,
                value: value,
              }}
              label="Nome:"
            />
          )}
          name="name"
        />
        <InputErrorMessage message={errors.name?.message} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              inputProps={{
                onChangeText: onChange,
                onBlur: onBlur,
                value: value,
              }}
              label="Email:"
            />
          )}
          name="email"
        />
        <InputErrorMessage message={errors.email?.message} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              inputProps={{
                onChangeText: onChange,
                onBlur: onBlur,
                value: value,
              }}
              label="Senha:"
            />
          )}
          name="password"
        />
        <InputErrorMessage message={errors.password?.message} />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              inputProps={{
                onChangeText: onChange,
                onBlur: onBlur,
                value: value,
              }}
              label="Confirmar senha:"
            />
          )}
          name="confirmPassword"
        />
        <InputErrorMessage message={errors.confirmPassword?.message} />

        {isLoading ? (
          <Loading />
        ) : (
          <Button
            className="bg-theme-pink-300 mt-6 w-28  self-center bg-transparent text-xl"
            onPress={handleSubmit(onSubmit)}
          >
            Avançar
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
