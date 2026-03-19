import { Task } from "../../entities/Task";
import { ITaskRepository } from "../../ports/ITaskRepository";

export class GetTasksUseCase{
    constructor(private taskRepository: ITaskRepository) {}

    async execute(userId: string): Promise<Task[]>{
        return this.taskRepository.findByUserId(userId);
    }
}