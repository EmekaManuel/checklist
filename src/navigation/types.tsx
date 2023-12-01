import { ICategory, ITask } from "@/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type RootBottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Today: undefined;
  Completed: NavigatorScreenParams<CompletedStackParamList>;
  CategoryStack: NavigatorScreenParams<CategoryStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  EditTaskScreen: {
    task: ITask;
  };
};

// export type TodayStackParamList = {
//   Categories: undefined;
//   Category: {
//     id: string;
//   };
//   CreateCategory?: undefined;
// };

export type CategoryStackParamList = {
  Categories: undefined;
  Category: {
    id: string;
  };
  CreateCategory: {
    category?: ICategory;
  };
};

export type CompletedStackParamList = {
  Home: undefined;
  EditTaskScreen: undefined;
};

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList>;
  Settings: undefined;
};

export type RootStackParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthScreenNavigationType<
  RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, RouteName>,
  NativeStackNavigationProp<AppStackParamList, "Root">
>;

export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootBottomTabParamList, Screen>,
    NativeStackScreenProps<RootBottomTabParamList>
  >;

export type CategoriesNavigationType =
  NativeStackNavigationProp<CategoryStackParamList>;

export type HomeScreenNavigationType =
  NativeStackNavigationProp<HomeStackParamList>;
