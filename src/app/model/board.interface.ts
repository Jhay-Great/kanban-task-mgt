export interface IBoard {
    boards: ISubBoard[];
}

export interface ISubBoard {
    name: string,
    columns: IColumns[],
}

export interface IColumns {
    name: string;
    tasks: ITask[];
}

export interface ITask {
    title: string;
    description: string;
    status: string;
    subtasks: ISubTask[];
}

export interface ISubTask {
    title: string;
    isComplete: boolean;
}