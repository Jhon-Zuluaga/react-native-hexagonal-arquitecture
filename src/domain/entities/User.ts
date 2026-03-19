export interface User{
    readonly id: string; //PK inmutable una vez asignado
    email: string;
    passwordHash: string;
    name: string;
    createdAt: Date;
}

// Funcion de dominio pura: valida si un email es valido
export const isValidEmail = (email: string): boolean =>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isValidPassword = (password: string): boolean =>{
    return password.length >= 6;
}