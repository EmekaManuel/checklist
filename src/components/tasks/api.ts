import axiosInstance from "@/services/config";
import {
  ITask,
  ITaskDeleteRequest,
  ITaskRequest,
  ITaskStatusRequest,
} from "@/types";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const createTaskRequest = async (
  url: string,
  { arg }: { arg: ITaskRequest }
) => {
  try {
    await axiosInstance.post(url, { ...arg });
  } catch (error) {
    console.log("error in creating new task");
    throw error;
  }
};

export const editTaskRequest = async (url: string, { arg }: { arg: ITask }) => {
  try {
    await axiosInstance.put(url + "/" + arg._id, { ...arg });
  } catch (error) {
    console.log("error editing task", error);
    throw error;
  }
};

export const deleteTaskRequest = async (
  url: string,
  { arg }: { arg: ITaskDeleteRequest }
) => {
  try {
    await axiosInstance.delete(url + "/" + arg.id);
  } catch (error) {
    console.log("error deleting task", error);
    throw error;
  }
};

export const toggleTaskStatus = async (
  url: string,
  { arg }: { arg: ITaskStatusRequest }
) => {
  try {
    await axiosInstance.put(url + "/" + arg.id, { ...arg });
  } catch (error) {}
};

export const useTaskMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "task/create",
    createTaskRequest
  );
  const { trigger: triggerToggleTaskStatus } = useSWRMutation(
    "task/update",
    toggleTaskStatus
  );
  const { trigger: triggerEditTask } = useSWRMutation(
    "task/edit",
    editTaskRequest
  );
  const { trigger: triggerDeleteTask } = useSWRMutation(
    "task/",
    deleteTaskRequest
  );

  const { mutate } = useSWRConfig();

  return {
    createTask: { trigger, isMutating },
    toggleTaskStatusCompleted: { triggerToggleTaskStatus },
    editTask: { triggerEditTask },
    deleteTask: { triggerDeleteTask },
    mutate,
  };
};
