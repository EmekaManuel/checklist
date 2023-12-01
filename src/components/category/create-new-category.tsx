import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { CategoriesNavigationType } from "@/navigation/types";
import { Feather } from "@expo/vector-icons";

const CreateNewCategoryInput = () => {
  const navigation = useNavigation<CategoriesNavigationType>();

  const navigateToCategoryScreen = () => {
    navigation.navigate("CreateCategory", {});
  };

  return (
    <TouchableOpacity onPress={navigateToCategoryScreen}>
      <Box
        p="3"
        bg="lightGray"
        borderRadius="rounded-5xl"
        flexDirection="row"
        alignItems="center"
      >
        <Feather name="plus" size={24} color={theme.colors.gray500} />
        <Text variant="textXl" fontWeight="500" color="gray650" ml="3">
          create new category
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CreateNewCategoryInput;

const styles = StyleSheet.create({});
