export interface Task{
    readonly id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

// Regla de negocio: el titulo no puede estar vacio
export const isValidTaskTitle = (title: string): boolean => {
    return title.trim().length > 0 && title.trim().length <= 100
};