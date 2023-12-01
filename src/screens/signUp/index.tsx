import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import PressableText from "@/components/shared/pressableTexts";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "@/navigation/types";
import { registerUser } from "@/services/api";
import { IUser } from "@/types";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const SignUpImage =
  "https://res.cloudinary.com/dkngy4g5z/image/upload/v1700404760/Sign_up-cuate_twyybm.png";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  const onSubmit = async (data: IUser) => {
    try {
      const { name, email, password } = data;
      await registerUser({
        name: name?.toLowerCase(),
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      });

      console.log("Registration successful!");
      navigateToSignInScreen();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
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
            <Image source={{ uri: SignUpImage, width: 220, height: 220 }} />
          </Box>
          <Text variant="textXl" fontWeight="700">
            Welcome To CheckList 👋🏽
          </Text>
          <Text variant="textXl" fontWeight="700" marginBottom="6">
            Your Journey Starts Here
          </Text>

          {/* Input Fields */}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Name"
                error={errors.name ? "Name is required" : undefined}
              />
            )}
            name="name"
          />
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
          <Button label="Register" onPress={handleSubmit(onSubmit)} uppercase />
          <PressableText
            text="Already Have an Account ? Login Here"
            onPress={navigateToSignInScreen}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  innercontainer: {
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
