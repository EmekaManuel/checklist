import CategoryScreen from "@/screens/category";
import CategoriesScreen from "@/screens/categories";
import CreateCategoryScreen from "@/screens/createCategory";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "./types";

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Categories"}
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Category"}
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CreateCategory"}
        component={CreateCategoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CategoryStackNavigator;
