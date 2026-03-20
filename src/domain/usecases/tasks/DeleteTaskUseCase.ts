import { Task } from "../../entities/Task";
import { ITaskRepository } from "../../ports/ITaskRepository";

export type DeleteTaskResult =
  | { success: true }
  | { success: false; error: "TASK_NOT_FOUND" };

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    taskId: string,
    currentTasks: Task[],
  ): Promise<DeleteTaskResult> {
    const task = currentTasks.find((t) => t.id === taskId);
    if (!task) return { success: false, error: "TASK_NOT_FOUND" };

    await this.taskRepository.delete(taskId);
    return { success: true };
  }
}
