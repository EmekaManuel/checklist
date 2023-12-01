import Loader from "@/components/shared/loade";
import NavigateBack from "@/components/shared/navigate-back";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/task";
import TaskActions from "@/components/tasks/task-actions";
import { CategoryStackParamList } from "@/navigation/types";
import { fetcher } from "@/services/config";
import { ICategory, ITask } from "@/types";
import { Box, Text } from "@/utils/theme";
import { RouteProp, useRoute } from "@react-navigation/core";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import useSWR from "swr";

type categoryScreenRouteProp = RouteProp<CategoryStackParamList, "Category">;

const CategoryScreen = () => {
  const route = useRoute<categoryScreenRouteProp>();
  const { id } = route.params;

  const { data: categoryData, isLoading: isCategoryLoading } =
    useSWR<ICategory>(`category/${id}`, fetcher);

  const {
    data: taskData,
    isLoading: isTaskLoading,
    mutate: mutateTask,
  } = useSWR<ITask[]>(`task/task-category/${id}`, fetcher, {
    refreshInterval: 100,
  });

  if (isTaskLoading || isCategoryLoading) return <Loader />;
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box width={40}>
          <NavigateBack />
        </Box>
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700">
            {categoryData?.icon.symbol}
          </Text>
          <Text
            variant="textXl"
            fontWeight="700"
            ml="3"
            style={{
              color: categoryData?.color.code,
            }}
          >
            {categoryData?.name}
          </Text>
        </Box>
        <Box height={16} />
        <TaskActions categoryId={id} />
        <Box height={16} />

        <FlatList
          data={taskData}
          renderItem={({ item, index }) => {
            return <Task mutateTask={mutateTask} task={item} />;
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
