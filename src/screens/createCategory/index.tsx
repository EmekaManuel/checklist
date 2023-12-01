import Button from "@/components/shared/button";
import NavigateBack from "@/components/shared/navigate-back";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { baseUrl } from "@/services/config";
import { CreateCategoryRouteTypes, ICategory, IColor, IIcon } from "@/types";
import { getColors, getIcons } from "@/utils/helpers";
import { Box, Text, Theme } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useCreateCategoryMutation } from "./api";

const COLORS = getColors();
const ICONS = getIcons();

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_ICONS = ICONS[0];

const CreateCategoryScreen = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();

  const route = useRoute<CreateCategoryRouteTypes>();

  const isEditing = route.params.category ? true : false;

  const {
    createCategory: { trigger, isMutating },
    updateCategory: { trigger: updateTrigger },
    deleteCategory: { trigger: deleteTrigger },
    mutate,
  } = useCreateCategoryMutation();

  const [category, setCategory] = useState<
    Omit<ICategory, "_id" | "user" | "isEditable">
  >({
    name: route.params.category?.name ?? "",
    color: route.params.category?.color ?? DEFAULT_COLOR,
    icon: route.params.category?.icon ?? DEFAULT_ICONS,
  });

  const createCategory = async () => {
    try {
      if (isEditing) {
        const updatedCategoryItem = { ...route.params.category, ...category };
        await updateTrigger({
          ...updatedCategoryItem,
        });
      } else {
        await trigger({
          ...category,
        });
      }
      await mutate(baseUrl + "category");
      navigation.goBack();
    } catch (error) {
      console.log("error in create new category", error);
      throw error;
    }
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id)
        await deleteTrigger({ id: route.params.category?._id });
      await mutate(baseUrl + "category");
      navigation.goBack();
    } catch (error) {
      console.log("error in deleting category", error);
      throw error;
    }
  };

  const updateColor = async (color: IColor) => {
    setCategory((prev) => {
      return { ...prev, color };
    });
  };
  const updateIcon = async (icon: IIcon) => {
    setCategory((prev) => {
      return { ...prev, icon };
    });
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <NavigateBack />
          {isEditing && (
            <Pressable>
              <MaterialCommunityIcons
                name="delete"
                color={theme.colors.rose400}
                size={24}
                onPress={deleteCategory}
              />
            </Pressable>
          )}
        </Box>

        <Box height={16} />
        <Box bg="gray250" borderRadius="rounded-2xl">
          <TextInput
            style={styles.textInput}
            value={category.name}
            maxLength={36}
            placeholder="Create New Category"
            placeholderTextColor={theme.colors.gray5}
            onChangeText={(text) =>
              setCategory((prev) => {
                return { ...prev, name: text };
              })
            }
          />
        </Box>
        <Box height={16} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            p="2"
            borderRadius="rounded-2xl"
            width={64}
            alignItems="center"
            mb="4"
            justifyContent="center"
          >
            <Text
              color={category.color.name as any}
              variant="textBase"
              fontWeight="600"
            >
              Colors
            </Text>
          </Box>

          {/* //colors */}
          <Box flexDirection="row" justifyContent="space-between">
            {COLORS.map((_color) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    updateColor(_color);
                  }}
                  key={_color.id}
                >
                  <Box
                    style={{ backgroundColor: _color.code }}
                    width={24}
                    height={24}
                    borderRadius="rounded-2xl"
                  ></Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>
        <Box height={16} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            p="2"
            borderRadius="rounded-2xl"
            width={64}
            alignItems="center"
            mb="4"
            justifyContent="center"
          >
            <Text
              color={category.color.name as any}
              variant="textBase"
              fontWeight="600"
            >
              {category.icon.symbol}
            </Text>
          </Box>

          {/* //icons */}
          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map((_iconItem) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    updateIcon(_iconItem);
                  }}
                  key={_iconItem.id}
                >
                  <Box width={24} height={24} borderRadius="rounded-2xl">
                    <Text variant="textBase">{_iconItem.symbol}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>

        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={5}
          style={{ marginTop: "100%" }}
        >
          <Button
            label={isEditing ? "Edit Category" : "Create New Category"}
            onPress={createCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    lineHeight: 26,
    padding: 16,
  },
});
