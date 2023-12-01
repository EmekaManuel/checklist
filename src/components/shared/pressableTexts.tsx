import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "@/utils/theme";

type PressableTextProps = {
  text: string;
  onPress?: () => void;
  uppercase?: boolean;
};

const PressableText = ({ text, onPress, uppercase }: PressableTextProps) => {
  return (
    <Pressable style={styles.PressableText} onPress={onPress}>
      <Text
        textTransform={uppercase ? "uppercase" : "capitalize"}
        textAlign="right"
        color="primary"
        variant="textXs"
        fontWeight="500"
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  PressableText: {
    marginVertical: 20,
  },
});
