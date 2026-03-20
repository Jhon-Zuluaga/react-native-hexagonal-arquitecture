import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/ports/IUserRepository";

const USERS_KEY = "@hexagonal_users";

export class AsyncStorageUserRepository implements IUserRepository {
  private async getAllUsers(): Promise<User[]> {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find((u) => u.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find((u) => u.id === id) ?? null;
  }

  async save(user: User): Promise<void> {
    const users = await this.getAllUsers();
    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async update(updatedUser: User): Promise<void> {
    const users = await this.getAllUsers();
    const updated = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u,
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
  }
}
