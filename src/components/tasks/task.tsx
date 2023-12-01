import { ITask } from "@/types";
import { AnimatedBox, Box, Text } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useTaskMutation } from "./api";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationType } from "@/navigation/types";
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TaskProps = {
  task: ITask;
  mutateTask: () => Promise<ITask[] | undefined>;
};

const Task = ({ task, mutateTask }: TaskProps) => {
  const navigation = useNavigation<HomeScreenNavigationType>();

  const navigateToEditTaskScreen = () => {
    navigation.navigate("EditTaskScreen", { task });
  };

  const {
    toggleTaskStatusCompleted: { triggerToggleTaskStatus },
    mutate,
  } = useTaskMutation();

  const toggleTaskStatusCompleted = async () => {
    try {
      const updatedTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await triggerToggleTaskStatus(updatedTask);
      await mutateTask();
    } catch (error) {
      console.log("error in toggling task status", error);
      throw error;
    }
  };

  const offset = useSharedValue(1);
  const checkmarkIconSize = useSharedValue(0.8);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }],
    };
  });

  const checkMarkIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(checkmarkIconSize.value) }],
      opacity: task.isCompleted ? offset.value : 0,
    };
  });

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable
        onPress={toggleTaskStatusCompleted}
        onLongPress={navigateToEditTaskScreen}
      >
        <Box
          p="4"
          bg="lightGray"
          borderRadius="rounded-5xl"
          flexDirection="row"
        >
          <Box flexDirection="row" alignItems="center">
            <AnimatedBox
              style={[animatedStyles]}
              flexDirection="row"
              alignItems="center"
            >
              <Box
                height={26}
                width={26}
                bg={task.isCompleted ? "gray9" : "gray300"}
                borderRadius="rounded-xl"
                alignItems="center"
                justifyContent="center"
              >
                {task.isCompleted && (
                  <AnimatedBox style={[checkMarkIconStyles]}>
                    <Ionicons name="ios-checkmark" size={20} color="white" />
                  </AnimatedBox>
                )}
              </Box>
            </AnimatedBox>
            <Text ml="3" variant="textBase">
              {task.name}
            </Text>
          </Box>
          <Box></Box>
        </Box>
      </Pressable>
    </AnimatedBox>
  );
};

export default Task;

const styles = StyleSheet.create({});
