import CategoryBox from "@/components/category/categories-box";
import CreateNewCategoryInput from "@/components/category/create-new-category";
import Loader from "@/components/shared/loade";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUser";
import { ICategory } from "@/types";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet } from "react-native";
import useSWR from "swr";

const CategoriesScreen = () => {
  const { data, isLoading } = useSWR("category/", fetcher, {
    refreshInterval: 1000,
  });

  const { logoutUser } = useUserGlobalStore();

  const handleLogout = () => {
    logoutUser();
  };

  const renderItem = ({ item }: { item: ICategory }) => (
    <CategoryBox category={item} />
  );
  if (isLoading) return <Loader />;
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="4">
        <Text fontWeight="700" mb="10" onPress={handleLogout} variant="textXl">
          Categories
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
        <CreateNewCategoryInput />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
