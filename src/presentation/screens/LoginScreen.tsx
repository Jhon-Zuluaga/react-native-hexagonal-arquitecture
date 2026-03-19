import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginStyle } from "../../../styles/loginStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

export const LoginScren = ({ navigation }: Props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useAuthStore();

    const handleLogin = async () =>{
        const success = await login(email, password);
        if(!success && error) Alert.alert('Error', error);
    };

    return (
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Bienvenido!</Text>
            <Text style={loginStyle.subtitle}>Inicia sesión para continuar</Text>

            <TextInput
                style={loginStyle.input}
                placeholder="Email"
                placeholderTextColor="#999" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={loginStyle.input}
                placeholder="Contraseña"
                placeholderTextColor="#999" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={loginStyle.error}>{error}</Text>}

            <TouchableOpacity 
            style={loginStyle.button}
            onPress={handleLogin}
            disabled={isLoading}
            >
            {isLoading ? <ActivityIndicator color ="#fff" /> : 
            <Text style={loginStyle.buttonText}>Iniciar sesión</Text>}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate('Register')}>
            <Text style={loginStyle.link}>¿No tienes cuenta? Registrate</Text>

            </TouchableOpacity>
        </View>
    );
};