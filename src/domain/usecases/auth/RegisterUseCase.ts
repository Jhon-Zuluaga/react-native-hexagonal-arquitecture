import { isValidEmail, isValidPassword, User } from "../../entities/User";
import { IUserRepository } from "../../ports/IUserRepository";

export type RegisterResult =
  | { success: true; user: User }
  | {
      success: false;
      error: "INVALID_EMAIL" | "INVALID_PASSWORD" | "EMAIL_TAKEN";
    };

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterResult> {
    // VALIDACIONES
    if (!isValidEmail(email)) return { success: false, error: "INVALID_EMAIL" };
    if (!isValidPassword(password))
      return { success: false, error: "INVALID_PASSWORD" };

    const existing = await this.userRepository.findByEmail(email);
    if (existing) return { success: false, error: "EMAIL_TAKEN" };

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      passwordHash: `hash_${password}`,
      createdAt: new Date(),
    };

    await this.userRepository.save(newUser);
    return { success: true, user: newUser };
  }
}
