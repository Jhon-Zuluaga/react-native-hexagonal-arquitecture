import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/ports/ITaskRepository";

const TASKS_KEY = '@hexagonal_tasks';

export class AsyncStorageTaskRepository implements ITaskRepository{
    
    private async getAllTasks(): Promise<Task[]> {
        const raw = await AsyncStorage.getItem(TASKS_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    async findByUserId(userId: string): Promise<Task[]> {
        const tasks = await this.getAllTasks();
        return tasks.filter(t => t.userId === userId);
    }

    async save(task: Task): Promise<void> {
        const tasks = await this.getAllTasks();
        tasks.push(task);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }

    async update(updatedTask: Task): Promise<void> {
        const tasks = await this.getAllTasks();
        const updated = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated))
    }
    
    async delete(taskId: string): Promise<void>{
        const tasks = await this.getAllTasks();
        const filtered = tasks.filter(t => t.id !== taskId);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filtered));
    }
}