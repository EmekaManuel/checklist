import { Box } from "@/utils/theme";
import React from "react";
import SafeAreaWrapper from "./safe-area-wrapper";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <SafeAreaWrapper>
      <Box style={styles.loader}>
        <ActivityIndicator />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
