import { isValidTaskTitle, Task } from "../../entities/Task";
import { ITaskRepository } from "../../ports/ITaskRepository";

export type EditTaskResult =
  | { success: true; task: Task }
  | { success: false; error: "INVALID_TITLE" | "TASK_NOT_FOUND" };

export class EditTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    taskId: string,
    newTitle: string,
    currentTasks: Task[],
  ): Promise<EditTaskResult> {
    const task = currentTasks.find((t) => t.id === taskId);
    if (!task) return { success: false, error: "TASK_NOT_FOUND" };

    if (!isValidTaskTitle(newTitle))
      return { success: false, error: "INVALID_TITLE" };

    const updatedTask: Task = { ...task, title: newTitle.trim() };
    await this.taskRepository.update(updatedTask);
    return { success: true, task: updatedTask };
  }
}
