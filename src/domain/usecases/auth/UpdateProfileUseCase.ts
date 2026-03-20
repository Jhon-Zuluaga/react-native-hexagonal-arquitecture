import { isValidEmail, User } from "../../entities/User";
import { IUserRepository } from "../../ports/IUserRepository";

export type UpdateProfileResult =
  | { success: true; user: User }
  | {
      success: false;
      error:
        | "INVALID_EMAIL"
        | "EMAIL_TAKEN"
        | "USER_NOT_FOUND"
        | "INVALID_NAME";
    };

export class UpdateProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userId: string,
    updates: { name?: string; email?: string; password?: string },
  ): Promise<UpdateProfileResult> {
    const user = await this.userRepository.findById(userId);
    if (!user) return { success: false, error: "USER_NOT_FOUND" };

    if (updates.email && updates.email !== user.email) {
      if (!isValidEmail(updates.email))
        return { success: false, error: "INVALID_EMAIL" };
      const existing = await this.userRepository.findByEmail(updates.email);
      if (existing) return { success: false, error: "EMAIL_TAKEN" };
    }

    if (updates.name && updates.name.trim().length === 0) {
      return { success: false, error: "INVALID_NAME" };
    }

    const updatedUser: User = {
      ...user,
      name: updates.name?.trim() ?? user.name,
      email: updates.email ?? user.email,
      passwordHash: updates.password
        ? `hash_${updates.password}`
        : user.passwordHash,
    };

    await this.userRepository.update(updatedUser);
    return { success: true, user: updatedUser };
  }
}
