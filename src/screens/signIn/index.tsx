import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import PressableText from "@/components/shared/pressableTexts";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "@/types";
import { loginUser } from "@/services/api";
import useUserGlobalStore from "@/store/useUser";

const SignInImage =
  "https://res.cloudinary.com/dkngy4g5z/image/upload/v1700404766/Login-cuate_df3kw2.png";

const SignInScreen = () => {
  const { updateUser } = useUserGlobalStore();
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUser, "name">>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Omit<IUser, "name">) => {
    try {
      const { email, password } = data;
      const user = await loginUser({
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      });
      updateUser({
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Box style={styles.innercontainer}>
            <Image source={{ uri: SignInImage, width: 220, height: 220 }} />
          </Box>
          <Text variant="textXl" fontWeight="700">
            You're Back 😃
          </Text>
          <Text variant="textXl" fontWeight="700" marginBottom="6">
            Login To Continue Your Journey
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                error={errors.email ? "Email is required" : undefined}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                error={errors.password ? "Password is required" : undefined}
              />
            )}
            name="password"
          />

          <Box height={22} />
          <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
          <PressableText
            text="New to CheckList ? Create An Account"
            onPress={navigateToSignUpScreen}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  innercontainer: {
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
