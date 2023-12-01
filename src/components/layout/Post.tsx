import { Image, View, ViewProps } from "react-native";

import { Post as PostType } from "@models/index";

import { Text } from "@ui/Text";
import { twMerge } from "tailwind-merge";

type PostProps = ViewProps & {
  data: PostType;
};

export function Post({ data, className, ...rest }: PostProps) {
  return (
    <View className={twMerge("")} {...rest}>
      <View className="flex-row items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full"
          source={{ uri: data.authorPicture }}
        />
        <Text>{data.authorName}</Text>
      </View>

      <Text>{data.content}</Text>
    </View>
  );
}
