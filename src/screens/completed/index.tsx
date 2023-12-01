import Loader from "@/components/shared/loade";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/task";
import { fetcher } from "@/services/config";
import { ITask } from "@/types";
import { Box, Text } from "@/utils/theme";
import { FlatList, StyleSheet } from "react-native";
import useSWR from "swr";

const CompletedTasksScreen = () => {
  const {
    data: completedTask,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`task/completed`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoadingTasks || !completedTask) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700" ml="3">
            Completed
          </Text>
        </Box>
        <Box height={16} />

        <FlatList
          data={completedTask}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <Task mutateTask={mutateTasks} task={item} />;
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CompletedTasksScreen;

const styles = StyleSheet.create({});
