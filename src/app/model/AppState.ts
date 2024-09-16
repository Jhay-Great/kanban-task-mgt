import { IBoard } from "./board.interface";

export interface AppState {
    boards: IBoard[];
    theme: string;
}