import { ICategory, ITaskRequest } from "@/types";
import { Box, Text } from "@/utils/theme";
import { format, isToday } from "date-fns";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import useSWR from "swr";
import Loader from "../shared/loade";
import { fetcher } from "@/services/config";
import { Calendar } from "react-native-calendars";
import { useTaskMutation } from "./api";
import { todaysISODate, today } from "@/utils/helpers";

type TaskActionsProps = {
  categoryId: string;
};

const TaskActions = ({ categoryId }: TaskActionsProps) => {
  const [isSelectingCategory, setisSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setisSelectingDate] = useState<boolean>(false);

  const [newTask, setnewTask] = useState<ITaskRequest>({
    categoryId: categoryId,
    date: todaysISODate.toISOString(),
    isCompleted: false,
    name: "",
  });

  const {
    createTask: { trigger, isMutating },
    mutate,
  } = useTaskMutation();

  const onCreateTask = async () => {
    try {
      if (newTask.name.length.toString().trim().length > 0) {
        await trigger({
          ...newTask,
        });
        setnewTask({
          categoryId: newTask.categoryId,
          isCompleted: false,
          date: todaysISODate.toISOString(),
          name: "",
        });
        await mutate("task/");
      }
    } catch (error) {
      console.log("error in onCreateTask", error);
      throw error;
    }
  };

  const { data: categoryData, isLoading: isCategoryLoading } = useSWR<
    ICategory[]
  >("category", fetcher);

  const selectedCategory = categoryData?.find(
    (_category) => _category?._id === newTask.categoryId
  );

  if (isCategoryLoading || !categoryData) return <Loader />;
  return (
    <Box>
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
          value={newTask.name}
          onChangeText={(text) => {
            setnewTask((prev) => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
          onSubmitEditing={onCreateTask}
        />
        <Box flexDirection="row" alignItems="center">
          <Pressable
            onPress={() => {
              setisSelectingDate((prev) => !prev);
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
                {isToday(new Date(newTask.date))
                  ? "Today"
                  : format(new Date(newTask.date), "MMM dd")}
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
                    setnewTask((prev) => {
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
                    borderTopStartRadius={index === 0 ? "rounded-3xl" : "none"}
                    borderTopEndRadius={index === 0 ? "rounded-3xl" : "none"}
                    borderBottomStartRadius={
                      categoryId?.length - 1 === index ? "rounded-2xl" : "none"
                    }
                    borderBottomEndRadius={
                      categoryId?.length - 1 === index ? "rounded-2xl" : "none"
                    }
                  >
                    <Box flexDirection="row">
                      <Text>{item.icon.symbol}</Text>
                      <Text
                        ml="2"
                        fontWeight={
                          newTask.categoryId === item._id ? "700" : "400"
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
      {isSelectingDate && (
        <Box>
          <Calendar
            minDate={format(today, "Y-MM-dd")}
            onDayPress={(day) => {
              setisSelectingDate(false);
              const selectedDate = new Date(day.dateString).toISOString();
              setnewTask((prev) => {
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
  );
};

export default TaskActions;

const styles = StyleSheet.create({
  textInputStyle: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    width: "50%",
    textAlignVertical: "center",
  },
});
