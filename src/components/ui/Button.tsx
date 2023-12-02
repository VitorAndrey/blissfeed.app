import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { ClassNameValue, twMerge } from "tailwind-merge";

import { Text } from "./Text";

type IconButtonProps = {
  children: React.ReactNode;
  touchableOpacityProps?: TouchableOpacityProps & {
    containerClass?: ClassNameValue;
  };
  textProps?: TextProps & {
    textClass?: ClassNameValue;
  };
};

export function Button({
  touchableOpacityProps,
  textProps,
  children,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={twMerge(
        "bg-primary h-10 w-full items-center justify-center rounded-3xl bg-theme-primary px-2",
        touchableOpacityProps?.containerClass,
      )}
      {...touchableOpacityProps}
    >
      <Text className={twMerge("", textProps?.textClass)} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
