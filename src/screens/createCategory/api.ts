import axiosInstance from "@/services/config";
import { ICategoryRequest } from "@/types";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const createCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  try {
    await axiosInstance.post(url, { ...arg });
  } catch (error) {
    console.log("error in creating new category", error);
    throw error;
  }
};

export const updateCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  try {
    await axiosInstance.put(url, { ...arg });
  } catch (error) {
    console.log("error in updating category", error);
    throw error;
  }
};

export const deleteCategoryRequest = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  try {
    await axiosInstance.delete(url + "/" + arg.id);
  } catch (error) {
    console.log("error in deleting category", error);
    throw error;
  }
};

export const useCreateCategoryMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "category/create",
    createCategoryRequest
  );
  const { trigger: updateTrigger } = useSWRMutation(
    "category/update",
    updateCategoryRequest
  );
  const { trigger: deleteTrigger } = useSWRMutation(
    "category/",
    deleteCategoryRequest
  );
  const { mutate } = useSWRConfig();

  return {
    createCategory: { trigger, isMutating },
    updateCategory: { trigger: updateTrigger },
    deleteCategory: { trigger: deleteTrigger },
    mutate,
  };
};
