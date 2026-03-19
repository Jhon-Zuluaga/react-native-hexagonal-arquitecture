import { User } from "../entities/User";

// Este es el CONTRATO. El dominio no sabe si usamos
// AsyncStorage, SQLITE o una api real solo sabe esto:

export interface IUserRepository{
    findbyEmail (email: string): Promise<User | null>;
    save(user: User): Promise<void>;

    findById(id: string): Promise<User | null>;
}