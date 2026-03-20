import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/authStore";
import { NavigationContainer } from "@react-navigation/native";
import { TasksScreen } from "../screens/TasksScreen";
import { LoginScren } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const user = useAuthStore((state) => state.user);
  const isRestoringSession = useAuthStore(state => state.isRestoringSession);
  const restoreSession = useAuthStore(state => state.restoreSession);

  useEffect(() => {
    // ← TEMPORAL: limpia todos los datos y empieza de cero
    //AsyncStorage.clear().then(() => {
    restoreSession();
  }, []);



  if(isRestoringSession){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "f8f8fb"}}> 
        <ActivityIndicator size="large" color="#534AB7" />

      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Tasks" component={TasksScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScren} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
