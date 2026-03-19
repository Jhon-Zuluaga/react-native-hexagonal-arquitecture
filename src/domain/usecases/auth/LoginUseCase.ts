import { IUserRepository } from "../../ports/IUserRepository";
import { User, isValidEmail, isValidPassword } from "../../entities/User";

// Tipos de resultado - El dominio define sus propios errores
export type LoginResult =
    | { success: true; user: User }
    | { success: false; error: 'INVALID_EMAIL' | 'INVALID_PASSWORD' 
                                | 'USER_NOT_FOUND' | 'WRONG_PASSWORD' };

export class LoginUseCase{
    // El caso de uso RECIBE el repositorio, nunca lo crea
    constructor(private userRepository: IUserRepository){}

    async execute(email: string, password: string): Promise<LoginResult> {

        // VALIDACIONES DE DOMINIO
        if (!isValidEmail(email)){
            return { success: false, error: 'INVALID_EMAIL'}
        }
        if (!isValidPassword(password)){
            return { success: false, error: 'INVALID_PASSWORD'}
        }

        // LOGICA DE NEGOCIO
        const user = await this.userRepository.findbyEmail(email);
        if(!user){
            return { success: false, error: 'USER_NOT_FOUND'}
        }

        // Simulamos HASH (en produccion bcrypt)
        const passwordHash = `hash_${password}`;
        if(user.passwordHash !== passwordHash){
            return { success: false, error: 'WRONG_PASSWORD'}
        }

        return { success: true, user};
    }
}                                