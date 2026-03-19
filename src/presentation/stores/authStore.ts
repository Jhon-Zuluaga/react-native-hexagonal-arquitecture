import { create } from "zustand";
import { User } from "../../domain/entities/User";
import { LoginUseCase } from "../../domain/usecases/auth/LoginUseCase";
import { RegisterUser } from "../../domain/usecases/auth/RegisterUseCase";
import { AsyncStorageUserRepository } from "../../infrastructure/repositories/AsyncStorageUserRepository";


// Inyeccion de dependencias: el store conecta dominio con infraestructura
const userRepo = new AsyncStorageUserRepository();
const loginUseCase = new LoginUseCase(userRepo);
const registerUseCase = new RegisterUser(userRepo);

interface AuthState{
    user: User | null,
    isLoading: boolean,
    error: string | null,
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const ERROR_MESSAGE: Record<string, string> ={
    INVALID_EMAIL: "El email no es válido",
    INVALID_PASSWORD: "La contraseña debe tener al menos 6 caracteres",
    USER_NOT_FOUND: "No existe una cuenta con ese email",
    WRONG_PASSWORD: "Contraseña incorrecta",
    EMAIL_TAKEN: 'Ya existe una cuenta con ese emai',
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null});
        const result = await loginUseCase.execute(email, password);
        if(result.success){
            set({ user: result.user, isLoading: false});
            return true;
        }
        set ({ error: ERROR_MESSAGE[result.error], isLoading: false});
        return false;
    },

    register: async (name, email, password) => {
        set({ isLoading: true, error: null});
        const result = await registerUseCase.execute(name, email, password);
        if(result.success){
            set({ user: result.user, isLoading: false});
            return true;
        }
        set({ error: ERROR_MESSAGE[result.error], isLoading: false});
        return false;
    },

    logout: () => set({user: null, error: null}),
}));