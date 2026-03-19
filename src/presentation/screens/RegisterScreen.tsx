import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { registerStyle } from "../../../styles/registerStyle";


type Props = {
    navigation: any;
};

export const RegisterScreen = ({ navigation }: Props) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, isLoading, error} = useAuthStore();

    const handleRegister = async () => {
        const success = await register(name, email, password);
        if(!success && error) Alert.alert('Error', error)
    };

    return(
        <View style={registerStyle.container}>
            <Text style={registerStyle.title}>Crear cuenta</Text>
            <Text style={registerStyle.subtitle}>Únete para empezar!</Text>

            <TextInput 
            style={registerStyle.input}
            placeholder="Nombre"
            placeholderTextColor="#999" 
            value={name}
            onChangeText={setName}
            />
            <TextInput 
            style={registerStyle.input}
            placeholder="Email"
            placeholderTextColor="#999" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />
             <TextInput 
            style={registerStyle.input}
            placeholder="Contraseña (mín. 6 caracteres)"
            placeholderTextColor="#999" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

            {error && <Text style={registerStyle.error}>{error}</Text>}
            
            <TouchableOpacity
            style={registerStyle.button}
            onPress={handleRegister}
            disabled={isLoading}
            >
                {isLoading ? <ActivityIndicator color="fff" /> : 
                <Text style={registerStyle.buttonText}>Registrarse</Text>}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.goBack()}>
                <Text style={registerStyle.link}>¿Ya tienes una cuenta? Inicia Sesión</Text>
            </TouchableOpacity>
            
        </View>
    );
};