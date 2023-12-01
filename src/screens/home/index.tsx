import Loader from "@/components/shared/loade";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/task";
import TaskActions from "@/components/tasks/task-actions";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUser";
import { ITask } from "@/types";
import { getGreeting } from "@/utils/helpers";
import { AnimatedText, Box, Text } from "@/utils/theme";
import { format } from "date-fns";
import { FlatList, StyleSheet } from "react-native";
import { ZoomInEasyDown } from "react-native-reanimated";
import useSWR from "swr";

const today = new Date();

const greeting = getGreeting({ hour: new Date().getHours() });

const HomeScreen = () => {
  const { user } = useUserGlobalStore();
  const {
    data: taskData,
    isLoading,
    mutate: mutateTask,
  } = useSWR<ITask[]>("task", fetcher, { refreshInterval: 1000 });

  if (isLoading || !taskData) return <Loader />;
  return (
    <SafeAreaWrapper>
      <Box flex={1} mt="4" mx="4">
        <AnimatedText
          variant="textXl"
          fontWeight="500"
          entering={ZoomInEasyDown.delay(500).duration(700)}
        >
          Good {greeting} {user?.name}
        </AnimatedText>
        <Text variant="textBase" fontWeight="500">
          It's {format(today, "eeee dd, LLL")}. - {taskData.length} tasks
        </Text>
        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={taskData}
          renderItem={({ item }) => (
            <Task mutateTask={mutateTask} task={item} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
