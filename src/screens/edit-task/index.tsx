import Loader from "@/components/shared/loade";
import NavigateBack from "@/components/shared/navigate-back";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { useTaskMutation } from "@/components/tasks/api";
import { HomeStackParamList } from "@/navigation/types";
import { fetcher } from "@/services/config";
import { ICategory, ITask } from "@/types";
import { today } from "@/utils/helpers";
import { Box, Text, Theme } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { format, isToday } from "date-fns";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import useSWR, { useSWRConfig } from "swr";

type EditTaskRouteProps = RouteProp<HomeStackParamList, "EditTaskScreen">;

const EditTaskScreen = () => {
  const theme = useTheme<Theme>();
  const route = useRoute<EditTaskRouteProps>();
  const { task } = route.params;
  const navigation = useNavigation();

  const {
    editTask: { triggerEditTask },
    deleteTask: { triggerDeleteTask },
  } = useTaskMutation();

  const [updatedTask, setUpdatedTask] = useState<ITask>(task);
  const [isSelectingCategory, setisSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingCalendarDate, setisSelectingCalendarDate] =
    useState<boolean>(false);

  const deleteTask = async () => {
    try {
      await triggerDeleteTask({
        id: task._id,
      });
      await mutate(`task/`);
      navigation.goBack();
    } catch (error) {
      console.log("error deleting task", error);
      throw error;
    }
  };

  const editTask = async () => {
    try {
      if (updatedTask.name.length.toString().trim().length > 0) {
        await triggerEditTask({ ...updatedTask });
      }
      await mutate("task/");
      navigation.goBack();
    } catch (error) {
      console.log("error editing task", error);
      throw error;
    }
  };

  const { mutate } = useSWRConfig();
  const { data: categoryData, isLoading: isCategoryLoading } = useSWR<
    ICategory[]
  >("category", fetcher);

  if (isCategoryLoading || !categoryData) {
    return <Loader />;
  }

  const selectedCategory = categoryData.find(
    (_category) => _category._id === updatedTask.categoryId
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <NavigateBack />
          <Pressable onPress={deleteTask}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.colors.rose500}
            />
          </Pressable>
        </Box>
        <Box height={20} />
        <Box
          bg="lightGray"
          px="4"
          py="3.5"
          borderRadius="rounded-5xl"
          flexDirection="row"
          position="relative"
        >
          <TextInput
            placeholder="Create a new task"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              fontSize: 16,
              width: "50%",
            }}
            maxLength={36}
            textAlignVertical="center"
            value={updatedTask.name}
            onChangeText={(text) => {
              setUpdatedTask((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
            onSubmitEditing={editTask}
          />
          <Box flexDirection="row" alignItems="center">
            <Pressable
              onPress={() => {
                setisSelectingCalendarDate((prev) => !prev);
              }}
            >
              <Box
                flexDirection="row"
                alignContent="center"
                bg="white"
                p="2"
                borderRadius="rounded-xl"
              >
                <Text>
                  {isToday(new Date(updatedTask.date))
                    ? "Today"
                    : format(new Date(updatedTask.date), "MMM dd")}
                </Text>
              </Box>
            </Pressable>
            <Box width={12} />
            <Pressable
              onPress={() => {
                setisSelectingCategory((prev) => !prev);
              }}
            >
              <Box
                bg="white"
                flexDirection="row"
                alignItems="center"
                p="2"
                borderRadius="rounded-xl"
              >
                <Box
                  width={12}
                  height={12}
                  borderRadius="rounded"
                  borderWidth={2}
                  mr="1"
                  style={{
                    borderColor: selectedCategory?.color.code,
                  }}
                ></Box>
                <Text
                  style={{
                    color: selectedCategory?.color.code,
                  }}
                >
                  {selectedCategory?.name}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {isSelectingCategory && (
          <Box alignItems="flex-end" my="4" justifyContent="flex-end">
            <FlatList
              data={categoryData}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      setUpdatedTask((prev) => {
                        return {
                          ...prev,
                          categoryId: item._id,
                        };
                      });
                      setisSelectingCategory(false);
                    }}
                  >
                    <Box
                      bg="gray250"
                      p="2"
                      borderTopStartRadius={
                        index === 0 ? "rounded-3xl" : "none"
                      }
                      borderTopEndRadius={index === 0 ? "rounded-3xl" : "none"}
                      borderBottomStartRadius={
                        categoryData?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                      borderBottomEndRadius={
                        categoryData?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                    >
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            updatedTask.categoryId === item._id ? "700" : "400"
                          }
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
            />
          </Box>
        )}
        {isSelectingCalendarDate && (
          <Box>
            <Calendar
              minDate={format(today, "Y-MM-dd")}
              onDayPress={(day) => {
                setisSelectingCalendarDate(false);
                const selectedDate = new Date(day.dateString).toISOString();
                setUpdatedTask((prev) => {
                  return {
                    ...prev,
                    date: selectedDate,
                  };
                });
              }}
            />
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({});
