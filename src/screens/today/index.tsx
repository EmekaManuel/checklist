import Loader from "@/components/shared/loade";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/task";
import { fetcher } from "@/services/config";
import { ITask } from "@/types";
import { Box, Text } from "@/utils/theme";
import { FlatList, StyleSheet } from "react-native";
import useSWR from "swr";

const TodayTaskScreen = () => {
  const {
    data: todayTaskData,
    isLoading,
    mutate: mutateTask,
  } = useSWR<ITask[]>("task/today", fetcher, { refreshInterval: 1000 });

  const todayISODate = new Date();
  todayISODate.setHours(0, 0, 0, 0);

  if (isLoading || !todayTaskData) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700" ml="3">
            Today
          </Text>
        </Box>
        <Box height={16} />

        <FlatList
          data={todayTaskData}
          renderItem={({ item, index }) => {
            return <Task task={item} mutateTask={mutateTask} />;
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default TodayTaskScreen;

const styles = StyleSheet.create({});
