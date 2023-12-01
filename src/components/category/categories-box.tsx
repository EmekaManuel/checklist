import { CategoriesNavigationType } from "@/navigation/types";
import { ICategory } from "@/types";
import { Box, Text } from "@/utils/theme";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

interface CategoryBoxProps {
  category: ICategory;
}

const CategoryBox = ({ category }: CategoryBoxProps) => {
  const navigation = useNavigation<CategoriesNavigationType>();

  const navigateToCreateCategoryScreen = () => {
    navigation.navigate("CreateCategory", { category: category });
  };
  const navigateToCategoryScreen = () => {
    navigation.navigate("Category", { id: category._id });
  };

  return (
    <Pressable onPress={navigateToCategoryScreen}>
      <Box bg="lightGray" borderRadius="rounded-5xl" p="4">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Text variant="textBase" fontWeight="600" mr="3">
              {category.icon.symbol}
            </Text>
            <Text variant="textBase" fontWeight="600">
              {category.name}
            </Text>
          </Box>
          <Pressable onPress={navigateToCreateCategoryScreen}>
            <Entypo size={16} name="dots-three-vertical" />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CategoryBox;

const styles = StyleSheet.create({});
