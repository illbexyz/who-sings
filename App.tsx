import {
  JosefinSans_500Medium,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider } from "native-base";
import React from "react";
import GameScreen from "./src/screens/GameScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { theme } from "./src/utils/theme";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export type RootStackParamList = {
  HomeScreen: undefined;
  GameScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
