import {
  JosefinSans_500Medium,
  JosefinSans_700Bold,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import GameResultsScreen from "./src/screens/GameResultsScreen";
import GameScreen from "./src/screens/GameScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { useStore } from "./src/store/store";
import { customTheme } from "./src/utils/theme";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export type RootStackParamList = {
  HomeScreen: undefined;
  GameScreen: undefined;
  GameResultsScreen: undefined;
  LeaderboardScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isInitializing = useStore((store) => store.isInitializing);
  const restoreState = useStore((store) => store.restoreState);
  const [fontsLoaded] = useFonts({
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  useEffect(() => restoreState(), []);

  if (!fontsLoaded || isInitializing) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider config={config} theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#2F8CE9" },
            headerTintColor: "#FFFFFF",
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen
            name="GameResultsScreen"
            component={GameResultsScreen}
          />
          <Stack.Screen
            name="LeaderboardScreen"
            component={LeaderboardScreen}
            options={{ headerShown: true, headerTitle: "Leaderboard" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: true, headerTitle: "Profile" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
