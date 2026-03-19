import { isValidTaskTitle, Task } from "../../entities/Task";
import { ITaskRepository } from "../../ports/ITaskRepository";


export type CreateTaskResult =
    | { success: true; task: Task}
    | { success: false; error: 'INVALID_TITLE'}

export class CreateTasksUseCase{
    constructor(private taskRepository: ITaskRepository) {}

    async execute (userId: string, title: string): Promise<CreateTaskResult>{
        if(!isValidTaskTitle(title)){
            return { success: false, error: 'INVALID_TITLE'}
        }

        const task: Task = {
             id:  Date.now().toString(),
             userId,
             title: title.trim(),
             completed: false,
             createdAt: new Date(),
        };

        await this.taskRepository.save(task)
        return{ success: true, task};
    }
}