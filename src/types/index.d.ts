import { CategoryStackParamList } from "@/navigation/types";
import { RouteProp } from "@react-navigation/core";
import { type } from "os";

export type CreateCategoryRouteTypes = RouteProp<
  CategoryStackParamList,
  "CreateCategory"
>;

export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAUthenticatedUser {
  name: string;
  email: string;
}

export interface ICategory {
  _id: string;
  name: string;
  user: string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

export interface ICategoryRequest {
  name: string;
  color: IColor;
  icon: IIcon;
}
export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}

export interface ITask {
  _id: string;
  name: string;
  isCompleted: boolean;
  categoryId: string;
  createdAt: string;
  date: string;
}
export interface ITaskRequest {
  name: string;
  isCompleted: boolean;
  categoryId: string;
  date: string;
}

export interface ITaskStatusRequest {
  id: string;
  isCompleted: boolean;
}
export interface ITaskDeleteRequest {
  id: string;
}
