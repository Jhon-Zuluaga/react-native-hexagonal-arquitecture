import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/authStore";
import { NavigationContainer } from "@react-navigation/native";
import { TasksScreen } from "../screens/TasksScreen";
import { LoginScren } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () =>{
    const user = useAuthStore(state => state.user);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { user ? (
                    <Stack.Screen name="Tasks" component={TasksScreen} />
                ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginScren} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                  </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}