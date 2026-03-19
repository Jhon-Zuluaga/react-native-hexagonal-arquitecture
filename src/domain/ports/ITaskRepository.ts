import { Task } from "../entities/Task";

export interface ITaskRepository{
    findByUserId(userId: string): Promise<Task[]>;
    save(task: Task): Promise<void>;

    update(task: Task): Promise<void>;
    delete(taskId: string): Promise<void>;
}