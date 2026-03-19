import { create } from "zustand";
import { Task } from "../../domain/entities/Task";
import { CreateTasksUseCase } from "../../domain/usecases/tasks/CreateTasksCase";
import { GetTasksUseCase } from "../../domain/usecases/tasks/GetTasksUseCase";
import { ToggleTasksCase } from "../../domain/usecases/tasks/ToggleTasksCase";
import { AsyncStorageTaskRepository } from "../../infrastructure/repositories/AsyncStorageTaskRepository";
import { DeleteTaskUseCase } from "../../domain/usecases/tasks/DeleteTaskUseCase";
import { EditTaskUseCase } from "../../domain/usecases/tasks/EditTaskUseCase";


const taskRepo = new AsyncStorageTaskRepository();
const getTasksUseCase = new GetTasksUseCase(taskRepo);
const createTaskUseCase = new CreateTasksUseCase(taskRepo);
const toggleTaskUseCase = new ToggleTasksCase(taskRepo);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepo);
const editTaskUseCase = new EditTaskUseCase(taskRepo);

interface TaskState{
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    loadTasks: (userId: string) => Promise<void>;
    createTask: (userId: string, title: string) => Promise<void>;
    toggleTask: (userId: string, taskId: string) => Promise<void>;
    deletedTask: (taskId: string) => Promise<void>;
    editTask: (taskId: string, newTitle: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    loadTasks: async (userId) => {
        set({ isLoading: true});
        const tasks = await getTasksUseCase.execute(userId);
        set({ tasks, isLoading: false});
    },

 
  createTask: async (userId, title) => {
    const result = await createTaskUseCase.execute(userId, title);
    if (result.success) {
      set(state => ({ tasks: [...state.tasks, result.task] }));
    } else {
      set({ error: 'El título no puede estar vacío' });
    }
  },

  toggleTask: async (userId, taskId) => {
    const { tasks } = get();
    const result = await toggleTaskUseCase.execute(userId, taskId, tasks);
    if (result.success) {
      set(state => ({
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        ),
      }));
    }
  },

  deletedTask: async (taskId) => {
    const { tasks } = get();
    const result = await deleteTaskUseCase.execute(taskId, tasks);
    if(result.success){
      set(state => ({
        tasks: state.tasks.filter(t => t.id !== taskId),
      }));
    }
  },

  editTask: async (taskId, newTitle) =>{
    const { tasks } = get();
    const result = await editTaskUseCase.execute(taskId, newTitle, tasks);
    if(result.success){
      set(state => ({
        tasks: state.tasks.map(t => t.id === taskId ? result.task : t),
      }));
    }
  },
}));