import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet } from "react-native";

const WelcomeImg =
  "https://res.cloudinary.com/dkngy4g5z/image/upload/v1700385904/Work_life_balance-amico_is77xx.png";
const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaWrapper>
      <LinearGradient
        style={styles.gradient}
        colors={["#FFFFFF", "#ecf5ff", "#d6e6ff", "#ffffff"]}
      >
        <Box style={styles.container}>
          <Box style={styles.innercontainer}>
            <Image source={{ uri: WelcomeImg, width: 220, height: 220 }} />
          </Box>
          <Text
            textTransform="capitalize"
            textAlign="center"
            fontWeight="500"
            variant="textBase"
          >
            Do you want to be more productive ?
          </Text>
          <Box my="3.5" mx="10">
            <Button
              label="Start Your Journey"
              onPress={navigateToSignUpScreen}
            />
          </Box>
          <Text
            color="gray4"
            textAlign="center"
            fontWeight="400"
            variant="textXs"
          >
            &copy; 2023 Emeka Manuel
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 3.5,
  },
  innercontainer: {
    alignItems: "center",
  },
});
