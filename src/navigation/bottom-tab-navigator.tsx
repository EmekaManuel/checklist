import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeStackNavigator from "./home-stack-navigator";
import CompletedTasksScreen from "@/screens/completed";
import { useTheme } from "@shopify/restyle";
import TodayTaskScreen from "@/screens/today";
import CategoryScreen from "@/screens/categories";
import Icons from "@/components/shared/icons";
import CategoryStackNavigator from "./category-stack-navigator";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const tabScreens = [
  {
    name: "HomeStack",
    component: HomeStackNavigator,
    options: {
      title: "Home",
      headerShown: false,
      tabBarIcon: ({ color }: { color: string }) => (
        <Icons name="home" color={color} />
      ),
    },
  },
  {
    name: "Today",
    component: TodayTaskScreen,
    options: {
      title: "Today Task",
      headerShown: false,
      tabBarIcon: ({ color }: { color: string }) => (
        <Icons name="categories" color={color} />
      ),
    },
  },
  {
    name: "Completed",
    component: CompletedTasksScreen,
    options: {
      title: "Completed",
      headerShown: false,
      tabBarIcon: ({ color }: { color: string }) => (
        <Icons name="completed" color={color} />
      ),
    },
  },
  {
    name: "CategoryStack",
    component: CategoryStackNavigator,
    options: {
      title: "Category",
      headerShown: false,
      tabBarIcon: ({ color }: { color: string }) => (
        <Icons name="calendar" color={color} />
      ),
    },
  },
];

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
      }}
    >
      {tabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name as keyof RootBottomTabParamList}
          component={screen.component}
          options={() => screen.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
