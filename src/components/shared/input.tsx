import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputProps = {
  label: string;
  placeholder: string;
  error?: string | undefined;
} & TextInputProps;

const Input = ({ label, placeholder, error, ...props }: InputProps) => {
  return (
    <Box flexDirection="column" mb="6">
      <Text variant="textXs" mb="2" textTransform="uppercase">
        {label}
      </Text>
      <TextInput
        style={[styles.textInput, error ? styles.errorBorder : null]}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <Text variant="textXs" color="red500" mt="2">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadii["rounded-7xl"],
  },
  errorBorder: {
    borderColor: theme.colors.red500,
  },
});
