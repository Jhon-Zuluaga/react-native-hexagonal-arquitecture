import { ITaskRepository } from "../../ports/ITaskRepository";

export type ToggleResult =
    | { success: true }
    | { success: false; error: 'TASK_NOT_FOUND'};

export class ToggleTasksCase{
    constructor(private taskRepository: ITaskRepository) {}

    async execute(userId: string, taskId: string, currentTasks: 
        import('../../entities/Task').Task[]): Promise<ToggleResult> {
            const task = currentTasks.find(t => t.id === taskId);
            if(!task) return { success: false, error: 'TASK_NOT_FOUND'};

            await this.taskRepository.update({... task, completed: !task.completed});
            return { success: true};
        }
}    